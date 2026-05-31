const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

console.log("Mongo URI:", process.env.MONGO_URI);

const userRoutes = require("../Backends/routes/userRoutes");
const accommodationRoutes = require("../Backends/routes/accommodationRoutes");
const reservationRoutes = require("../Backends/routes/reservationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/reservations", reservationRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Airbnb Clone API is running 🚀");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });
  mongoose.connection.on("connected", () => {
  console.log("📦 Connected DB Name:", mongoose.connection.name);
  console.log("📍 Connected Host:", mongoose.connection.host);
  });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});