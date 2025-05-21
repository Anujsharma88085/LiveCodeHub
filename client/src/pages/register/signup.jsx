import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import backgroundImg from "../../assets/background.jpg";
import { styles, inputStyle } from "../../styles/commonStyles";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    isSignup,
    form,
    message,
    handleChange,
    setMessage,
    resetForm,
    toggleSignup,
    user,
    setIsSignup,
    setUser,
  } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  setIsSignup(true)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        {
          name: form.name,
          username: form.username, // <-- Include username in the payload
          email: form.email,
          password: form.password,
          passwordConfirm: form.confirmPassword,
          role: form.role,
        },
        { withCredentials: true }
      );

      setMessage("Signup successful!");
      console.log(res.data.token);
      localStorage.setItem('token',res.data.token);
      setUser(res.data.data.user);
      setTimeout(() => {
        resetForm();
        navigate("/"); // Redirect to home or dashboard
      }, 1500);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong"); 
    }
  };

  return (
    <>
      <Box sx={styles.background} />
      <Box sx={styles.overlay} />
      <Box sx={styles.container}>
        <Paper elevation={8} sx={styles.paper}>
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: "bold", color: "white" }}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </Typography>

          <Button
            onClick={toggleSignup}
            fullWidth
            sx={{
              mb: 3,
              backgroundColor: "#9c4dcc",
              '&:hover': { backgroundColor: "#7b1fa2" },
            }}
          >
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </Button>

          {message && (
            <Typography sx={{ mb: 2, color: "yellow", fontWeight: "bold" }}>
              {message}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={inputStyle}
                />
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={inputStyle}
                />
              </>
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={inputStyle}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
              sx={inputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {isSignup && (
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
                sx={inputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm(!showConfirm)}
                        edge="end"
                      >
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#7b1fa2",
                '&:hover': { backgroundColor: "#9c4dcc" },
              }}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default SignupPage;
