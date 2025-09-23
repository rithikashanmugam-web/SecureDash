import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import API from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load user info from localStorage
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    setUser({ name, email });
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.put(
        "/users/updateProfile",
        {
          name: user.name,
          email: user.email,
          ...(password && { password }),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update localStorage as well
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);

      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f1f7ff",
        }}
      >
        <Typography
          variant="h4"
          mb={3}
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          My Profile
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Leave blank if you don't want to change password"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mt: 1 }}
          >
            Update Profile
          </Button>

          {message && (
            <Typography
              color={message.includes("successfully") ? "success.main" : "error"}
              sx={{ mt: 1 }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
