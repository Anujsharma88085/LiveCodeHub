const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path=require('path')
const dotenv = require('dotenv');

const { globalErrorHandler } = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const folderRouter = require('./routes/folderRoutes');
const playgroundRouter = require('./routes/playgroundRoutes');

dotenv.config({ path: './config.env' });

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming Request → ${req.method} ${req.originalUrl}`);
  next();
});

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Security middlewares
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Sanitize inputs
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/folders', folderRouter);
app.use('/api/v1/playground', playgroundRouter);

// Base route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running 🚀' });
});

// Handle unknown routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.use(globalErrorHandler);

module.exports = app;
