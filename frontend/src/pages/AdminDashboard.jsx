import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const modules = JSON.parse(localStorage.getItem("modules")) || [];
  const name = localStorage.getItem("name");

  const handleModuleClick = (moduleName) => {
    navigate(`/admin/module/${moduleName}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {name} (Admin)
      </Typography>

      <Button
        onClick={handleLogout}
        sx={{
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          "&:hover": { backgroundColor: "#333" },
          mb: 3,
        }}
      >
        Logout
      </Button>

      <Typography variant="h6" gutterBottom>
        Your Modules:
      </Typography>

      <Box>
        {modules.map((mod) => (
          <Button
            key={mod}
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleModuleClick(mod)}
          >
            {mod.charAt(0).toUpperCase() + mod.slice(1)}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
