import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Models
import { UserModel } from "./models/User.js";
import { MovieModel } from "./models/Movie.js";
import { TheatreModel } from "./models/Theatre.js";
import { BookingModel } from "./models/Booking.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Setup directory handling for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../pages")));
app.use(express.static(path.join(__dirname, "../assets")));

// Initialize database and tables
const db = new sqlite3.Database("./backend/db/moviehub.db");
UserModel.createTable();
MovieModel.createTable();
TheatreModel.createTable();
BookingModel.createTable();

// Default route
app.get("/", (req, res) => {
  res.send("🎬 Welcome to WatchMovies API - Backend is running!");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Fallback route for 404s
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
