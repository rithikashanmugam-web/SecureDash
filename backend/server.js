const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Allow only specific origins (local + optional deployed frontend)
const allowedOrigins = [
  "http://localhost:5173", // dev frontend
  "https://frontend-r9ikiqnjt-rithikashanmugam62-1788s-projects.vercel.app" // optional deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Import API routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// ✅ Serve frontend static files
const frontendBuildPath = path.join(__dirname, "../frontend/dist"); // updated for Vite build
app.use(express.static(frontendBuildPath));

// ✅ Serve index.html for all unknown routes (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
