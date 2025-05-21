import { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/background.jpg"; // Adjust path as needed
import { toast } from 'react-toastify';

import { styles, inputStyle } from "../../styles/commonStyles"; // Extract common styles if you haven't
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    form,
    isSignup,
    message,
    user,
    setUser,
    handleChange,
    setMessage,
    toggleSignup,
    resetForm,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleForgotPassword = async () => {
    console.log(form);
    const email = form.email;
    if (!email) {toast.info('email field is required'); return;}

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/forgotPassword",
        { email }
      );
      toast.success(response.data.message || "Password reset link sent.");
    } catch (error) {
      console.error("Forgot password error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      console.log("Login successful:", response.data.data.user);
      toast.success("Login successful!");
      console.log(response.data.token);
      localStorage.setItem('token',response.data.token);
      setUser(response.data.data.user);
      setTimeout(() => {
        resetForm();
        navigate("/"); // or wherever you want to redirect
      }, 1000);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <>
      <Box sx={styles.background} />
      <Box sx={styles.overlay} />
      <Box sx={styles.container}>
        <Paper elevation={8} sx={styles.paper}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "white" }}>
            Log In
          </Typography>

          {message && (
            <Typography sx={{ mb: 2, color: "yellow", fontWeight: "bold" }}>
              {message}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
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
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              onClick={handleForgotPassword}
              variant="text"
              sx={{ mt: 1, color: "white", textTransform: "none", float: "right" }}
            >
              Forgot Password?
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#7b1fa2",
                "&:hover": { backgroundColor: "#9c4dcc" },
              }}
            >
              Log In
            </Button>
          </form>

          <Button
            fullWidth
            variant="text"
            onClick={toggleSignup}
            sx={{ mt: 2, color: "white", textDecoration: "underline" }}
          >
            Don't have an account? Sign Up
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default LoginPage;
