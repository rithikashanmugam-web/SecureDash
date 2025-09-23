import { useState, useEffect } from "react";
import {
  Container, Paper, Typography, TextField, Button,
  FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText
} from "@mui/material";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const availableModules = ["inventory", "reports", "dashboard", "settings", "analytics"];

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [modules, setModules] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const superAdminName = localStorage.getItem("name");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data.filter(u => u.role !== "superadmin"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreateUser = async () => {
    try {
      const res = await API.post("/users/register", { name, email, password, role, modules }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(res.data.message);
      setName(""); setEmail(""); setPassword(""); setRole("user"); setModules([]);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setModules(user.modules);
    setPassword(""); // reset password
  };

  const handleModuleClick = (moduleName) => navigate(`/superadmin/module/${moduleName}`);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {superAdminName} (Super Admin)
      </Typography>
      <button
  onClick={handleLogout}
  style={{
    padding: "10px 20px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px"
  }}
>
  Logout
</button>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Create Admin/User</Typography>

        <TextField label="Name" fullWidth value={name} onChange={e => setName(e.target.value)} sx={{ mt: 2 }}/>
        <TextField label="Email" fullWidth value={email} onChange={e => setEmail(e.target.value)} sx={{ mt: 2 }}/>
        <TextField label="Password" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} sx={{ mt: 2 }}/>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={e => setRole(e.target.value)}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Modules</InputLabel>
          <Select
            multiple
            value={modules}
            onChange={e => setModules(e.target.value)}
            renderValue={selected => selected.join(", ")}
          >
            {availableModules.map(m => (
              <MenuItem key={m} value={m}>
                <Checkbox checked={modules.includes(m)} />
                <ListItemText primary={m} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleCreateUser}>Create User/Admin</Button>
        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Existing Users/Admins</Typography>
        {users.map(user => (
          <Paper key={user._id} sx={{ p: 2, mt: 2 }}>
            <Typography>Name: {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Role: {user.role}</Typography>
            <Typography>Modules: {user.modules.join(", ")}</Typography>
            {user.modules.map(mod => (
              <Button key={mod} variant="outlined" sx={{ m: 1 }} onClick={() => handleModuleClick(mod)}>
                {mod}
              </Button>
            ))}
            <Button variant="contained" color="primary" sx={{ mt: 1, mr: 1 }} onClick={() => handleEdit(user)}>Edit</Button>
            <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={() => handleDelete(user._id)}>Delete</Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
