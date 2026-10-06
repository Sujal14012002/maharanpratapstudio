require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const photoRoutes = require("./routes/photos");
const videoRoutes = require("./routes/videos");
const frameRoutes = require("./routes/frames");
const enquiryRoutes = require("./routes/enquiries");
const studioRoutes = require("./routes/studio");

const app = express();

// ======================================================
// DATABASE
// ======================================================

connectDB();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================================
// SERVE UPLOADED FILES
// ======================================================

// Images stored inside:
// backend/uploads/

// They will be accessible like:
// http://localhost:5000/uploads/image-name.jpg

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Maharana Pratap Studio API is running",
  });
});

// ======================================================
// API ROUTES
// ======================================================

app.use("/api/photos", photoRoutes);

app.use("/api/videos", videoRoutes);

app.use("/api/frames", frameRoutes);

app.use("/api/enquiries", enquiryRoutes);

app.use("/api/studio", studioRoutes);

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// ======================================================
// START SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `[Server] Maharana Pratap Studio API running on port ${PORT}`
  );
  console.log(
    `[Server] Uploaded files: http://localhost:${PORT}/uploads/`
  );
});