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
import { useNavigate, useSearchParams } from "react-router-dom"; // Using useSearchParams for the URL query params

import backgroundImg from "../../assets/background.jpg"; // Adjust path as needed
import { styles, inputStyle } from "../../styles/commonStyles"; // Import common styles

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get token and email from the URL query parameters
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
  
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
  
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/users/resetPassword/${token}`,
        {
          email,
          newPassword,
          passwordConfirm: confirmPassword
        },
        {
          withCredentials: true
        }
      );
  
      console.log("Response:", res.data);
      setSuccess("Password reset successful! Redirecting to login...");
      setLoading(false);
  
      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
  
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };
  
  return (
    <>
      <Box sx={styles.background} />
      <Box sx={styles.overlay} />
      <Box sx={styles.container}>
        <Paper elevation={8} sx={styles.paper}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "white" }}>
            Reset Password
          </Typography>

          {error && (
            <Typography sx={{ mb: 2, color: "red", fontWeight: "bold" }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography sx={{ mb: 2, color: "green", fontWeight: "bold" }}>
              {success}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#7b1fa2",
                "&:hover": { backgroundColor: "#9c4dcc" },
              }}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default ResetPassword;
