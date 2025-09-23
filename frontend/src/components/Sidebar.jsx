import { List, ListItem, ListItemText, Drawer, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ modules, role }) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "primary.main", // Blue background
          color: "secondary.main", // White text
        },
      }}
    >
      <Toolbar />
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 2, mb: 3, fontWeight: "bold", color: "secondary.main" }}
      >
        SecureDash
      </Typography>
      <List>
        {modules.map((mod) => (
          <ListItem
            button
            key={mod}
            component={Link}
            to={`/dashboard/module/${mod.toLowerCase()}`}
            sx={{
              color: "secondary.main",
              fontWeight: location.pathname.includes(mod.toLowerCase()) ? "bold" : "normal",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ListItemText primary={mod} />
          </ListItem>
        ))}

        <ListItem
          button
          component={Link}
          to="/profile"
          sx={{
            color: "secondary.main",
            fontWeight: location.pathname === "/profile" ? "bold" : "normal",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          <ListItemText primary="Profile" />
        </ListItem>

        {role === "superadmin" && (
          <ListItem
            button
            component={Link}
            to="/dashboard/manage-users"
            sx={{
              color: "secondary.main",
              fontWeight: location.pathname.includes("manage-users") ? "bold" : "normal",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ListItemText primary="Manage Users" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
