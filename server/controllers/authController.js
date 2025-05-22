const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const bcrypt=require('bcrypt')
const axios = require('axios');
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // console.log('dfdfdfdfdfdfdfdffdffdf')
  const cookieOptions = {
    httpOnly: true, 
    secure: false, 
    sameSite: 'Lax', 
    maxAge: 7 * 24 * 60 * 60 * 1000, 

  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  // console.log(user,token,statusCode);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // console.log(req.body)
  const existingUser = await User.findOne({ email: req.body.email, active: { $ne: false } });
if (existingUser) {
  return res.status(400).json({ message: 'Email already in use.' });
}
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    username:req.body.username
  });

  const url = `${req.protocol}://${req.get('host')}/me`;
  // console.log(url);
  // await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) Create and send token

  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  // console.log('ddddddd',req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }


  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // console.log(token,'ttttt')

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log('ttttt')

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // console.log('ttttt')

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }



  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  // console.log('user');

  const user = await User.findOne({ email });
  // console.log(user);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }


  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}`;

  const emailContent = {
    sender: { name: "Your App", email: process.env.BREVO_SENDER_EMAIL },
    to: [{ email }],
    subject: "Password Reset Request",
    htmlContent: `
      <h1>Password Reset Request</h1>
      <p>You have requested to reset your password.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  };

  // Send email using Brevo's API
  try {
    const response = await axios.post(BREVO_API_URL, emailContent, {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
    });

    console.log('Brevo response:', response.status, response.data);

    if (response.status === 201 || response.status === 202) {
      return res.status(200).json({
        success: true,
        message: "Password reset email sent successfully.",
      });
    } else {
      return res.status(400).json({
        error: "Email service responded with an unexpected status.",
        details: response.data,
      });
    }
  } catch (error) {
    console.error("Error sending email via Brevo:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to send reset email. Please try again later.",
      details: error.response?.data || error.message,
    });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get the user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }, // Check if the token has expired
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // console.log(req.body);

  // 2) Check if both password and passwordConfirm are provided
  if (!req.body.newPassword || !req.body.passwordConfirm) {
    return next(new AppError('Please provide both password and confirm password', 400));
  }

  // 3) Check if password and passwordConfirm match
  if (req.body.newPassword !== req.body.passwordConfirm) {
    return next(new AppError('Passwords do not match!', 400));
  }

  // 4) Set the new password and remove passwordConfirm
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm; // Do not store this in the DB

  // Clear the password reset token and expiry fields
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // 5) Save the user with the new password (it will be hashed due to pre-save hook)
  await user.save();

  // 6) Send a new JWT token for the user (or just return a success message)
  createSendToken(user, 200, res);
});


exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});