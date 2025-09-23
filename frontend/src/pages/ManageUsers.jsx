import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import API from "../api/axios";

const ALL_MODULES = ["inventory", "reports", "sales", "analytics"]; // fixed module list

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users"); // Super Admin only
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setSelectedModules(user.modules);
    setSelectedRole(user.role);
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/users/${selectedUser._id}`, {
        role: selectedRole,
        modules: selectedModules,
      });
      setOpen(false);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" color="primary.main" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Manage Users
      </Typography>

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3, backgroundColor: "background.paper" }}>
              <Typography>Name: {user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Role: {user.role}</Typography>
              <Typography>Modules: {user.modules.join(", ")}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={() => handleEdit(user)}
              >
                Edit
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Edit User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Modules</InputLabel>
            <Select
              multiple
              value={selectedModules}
              onChange={(e) => setSelectedModules(e.target.value)}
              renderValue={(selected) => selected.join(", ")}
            >
              {ALL_MODULES.map((mod) => (
                <MenuItem key={mod} value={mod}>
                  <Checkbox checked={selectedModules.includes(mod)} />
                  <ListItemText primary={mod} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
