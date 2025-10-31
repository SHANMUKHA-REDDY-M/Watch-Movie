import express from "express";
import { UserModel } from "../models/User.js";
import { MovieModel } from "../models/Movie.js";
import { BookingModel } from "../models/Booking.js";

const router = express.Router();

// 🧑‍💼 Dashboard summary
router.get("/dashboard", (req, res) => {
  let summary = {};
  UserModel.getAll((_, users) => {
    summary.users = users?.length || 0;
    MovieModel.getAll((_, movies) => {
      summary.movies = movies?.length || 0;
      BookingModel.getAll((_, bookings) => {
        summary.bookings = bookings?.length || 0;
        res.json(summary);
      });
    });
  });
});

// 🧩 Get all users
router.get("/users", (req, res) => {
  UserModel.getAll((err, users) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(users);
  });
});

export default router;
