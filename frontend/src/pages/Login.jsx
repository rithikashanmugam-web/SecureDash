import { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const normalizeRole = (role) => {
    if (!role) return "";
    return String(role).toLowerCase().replace(/[_\s]/g, "");
  };

  const handleLogin = async () => {
    setError("");
    try {
      const res = await API.post("/users/login", { email, password });

      // <-- Debug: inspect full response in console
      console.log("Full login response:", res?.data);

      if (!res || !res.data) {
        setError("Empty response from server");
        console.error("Empty login response", res);
        return;
      }

      // token must exist
      const token = res.data.token;
      if (!token) {
        setError(res.data.message || "Login failed: no token returned");
        console.error("Login response missing token:", res.data);
        return;
      }

      // normalize role
      const normalizedRole = normalizeRole(res.data.role || "");

      // Save core items to localStorage BEFORE redirect
      localStorage.setItem("token", token);
      localStorage.setItem("role", normalizedRole);
      localStorage.setItem("modules", JSON.stringify(res.data.modules || []));
      localStorage.setItem("name", res.data.name || "");
      localStorage.setItem("email", res.data.email || "");

      // Final debug log so we can see exactly what's stored
      console.log("Stored token & role:", {
        tokenPresent: !!localStorage.getItem("token"),
        roleStored: localStorage.getItem("role"),
        modules: JSON.parse(localStorage.getItem("modules") || "[]"),
      });

      // Use full page navigation so routing guards read from localStorage synchronously
      if (normalizedRole === "superadmin") {
        window.location.replace("/superadmin");
      } else if (normalizedRole === "admin") {
        window.location.replace("/admin");
      } else if (normalizedRole === "user") {
        window.location.replace("/user");
      } else {
        setError("Unknown role returned: " + (res.data.role ?? "undefined"));
        console.error("Unknown role in login response:", res.data.role);
      }
    } catch (err) {
      // show a helpful message
      const msg = err?.response?.data?.message || err.message || "Login failed";
      setError(msg);
      console.error("Login error:", err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          mt: 10,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f1f7ff",
        }}
      >
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          SecureDash Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
        />

        <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleLogin}>
          Login
        </Button>

        {error && (
          <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
