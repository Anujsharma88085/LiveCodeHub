import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Settings, Delete, PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
  const { user, setUser, logout, updateUser, updatePassword, deleteUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Photo preview on file select
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Save profile info using context function
  const handleProfileSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photoFile) formData.append("photo", photoFile);
    await updateUser(formData);
  };

  // Save password using context function
  const handlePasswordSave = async () => {
    if (newPassword !== passwordConfirm) {
      alert("New password and confirmation do not match!");
      return;
    }
    await updatePassword(currentPassword, newPassword, passwordConfirm);
    setCurrentPassword("");
    setNewPassword("");
    setPasswordConfirm("");
  };

  // Delete account using context function
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible!")) {
      deleteUser();
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "linear-gradient(to right, #430089, #82ffa1)" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          background: "linear-gradient(to bottom, #3f0d7d, #8e2de2)",
          color: "#fff",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" mb={2}>
            Menu
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon sx={{ color: "#fff" }}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={handleDeleteAccount}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <Delete />
              </ListItemIcon>
              <ListItemText primary="Delete Account" />
            </ListItem>
          </List>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, p: 4, height: "100vh", overflowY: "auto" }}>
        {/* Profile settings */}
        <Paper
          elevation={6}
          sx={{ p: 4, mb: 4, background: "linear-gradient(to right, #8e44ad, #c0392b)", color: "#fff" }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
            Your Account Settings
          </Typography>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "#f1c40f" }}>Name</InputLabel>
              <OutlinedInput
                fullWidth
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "#f1c40f" }}>Email address</InputLabel>
              <OutlinedInput
                fullWidth
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar sx={{ width: 56, height: 56, mr: 2 }} src={photoPreview} alt={name} />
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{ color: "#f1c40f", borderColor: "#f1c40f" }}
                >
                  Choose new photo
                  <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ backgroundColor: "#f1c40f", color: "#000" }} onClick={handleProfileSave}>
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Password change */}
        <Paper
          elevation={6}
          sx={{ p: 4, background: "linear-gradient(to right, #1d2671, #c33764)", color: "#fff" }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
            Password Change
          </Typography>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "#f1c40f" }}>Current password</InputLabel>
              <OutlinedInput
                fullWidth
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "#f1c40f" }}>New password</InputLabel>
              <OutlinedInput
                fullWidth
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "#f1c40f" }}>Confirm password</InputLabel>
              <OutlinedInput
                fullWidth
                type="password"
                placeholder="Confirm new password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ backgroundColor: "#f1c40f", color: "#000" }} onClick={handlePasswordSave}>
                Save Password
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default SettingsPage;
