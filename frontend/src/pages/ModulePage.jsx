import { useParams, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Button, Box, List, ListItem, ListItemText } from "@mui/material";

export default function ModulePage() {
  const { moduleName } = useParams();
  const navigate = useNavigate();

  const moduleDetails = {
    inventory: {
      title: "Inventory Management",
      points: [
        "Add, edit, and delete stock items.",
        "Track available products in real time.",
        "Generate low-stock alerts automatically.",
        "Export inventory reports in PDF/Excel.",
      ],
      quote: "“Great businesses keep track of small things — inventory is the silent backbone of growth.”",
    },
    reports: {
      title: "Reports Module",
      points: [
        "Generate daily, weekly, and monthly reports.",
        "Export reports in PDF/CSV formats.",
        "Share reports securely with team members.",
        "Customize report templates as per needs.",
      ],
      quote: "“Data doesn’t lie — reports turn numbers into stories that drive decisions.”",
    },
    dashboard: {
      title: "Dashboard Overview",
      points: [
        "View all important business metrics in one place.",
        "Interactive charts and visual analytics.",
        "Quick glance at performance indicators.",
        "Personalized widgets for different roles.",
      ],
      quote: "“A dashboard is more than graphs — it’s a window into your business’s heartbeat.”",
    },
    settings: {
      title: "Settings & Configuration",
      points: [
        "Manage user roles and permissions.",
        "Update application preferences easily.",
        "Control notifications and security settings.",
        "Integration with third-party apps.",
      ],
      quote: "“Good settings create freedom — they let systems work exactly as you want.”",
    },
    analytics: {
      title: "Analytics & Insights",
      points: [
        "Perform advanced data analysis.",
        "Track sales, revenue, and customer behavior.",
        "Predictive analytics using AI/ML models.",
        "Generate visual dashboards for insights.",
      ],
      quote: "“Without data you’re just guessing — analytics turns guesses into clarity.”",
    },
  };

  const details = moduleDetails[moduleName];

  return (
    <Container maxWidth="md" sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mb: 3 }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Paper sx={{ p: 5, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h4" gutterBottom>
            {details ? details.title : "Module"}
          </Typography>

          {details ? (
            <>
              <List sx={{ textAlign: "left", mt: 2 }}>
                {details.points.map((point, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={`• ${point}`} />
                  </ListItem>
                ))}
              </List>

              {/* Quote Section */}
              <Typography
                variant="subtitle1"
                sx={{ mt: 4, fontStyle: "italic", textAlign: "center", color: "gray" }}
              >
                {details.quote}
              </Typography>
            </>
          ) : (
            <Typography variant="body1">
              Details for this module are not available yet.
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
