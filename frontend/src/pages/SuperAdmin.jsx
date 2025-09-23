import { useEffect, useState } from "react";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";
import API from "../api/axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users"); // Super Admin only
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3}>Manage Users</Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Paper sx={{ p: 2 }}>
              <Typography>Name: {user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Role: {user.role}</Typography>
              <Typography>Modules: {user.modules.join(", ")}</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Edit
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
