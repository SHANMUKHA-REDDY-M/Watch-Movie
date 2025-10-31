import express from "express";
import { BookingModel } from "../models/Booking.js";

const router = express.Router();

// 🎟 Get all bookings
router.get("/", (req, res) => {
  BookingModel.getAll((err, bookings) => {
    if (err) return res.status(500).json({ message: "Error fetching bookings" });
    res.json(bookings);
  });
});

// 🎟 Create new booking
router.post("/", (req, res) => {
  const booking = req.body;
  BookingModel.create(booking, (err, newBooking) => {
    if (err) return res.status(500).json({ message: "Error creating booking" });
    res.json({ message: "Booking successful", booking: newBooking });
  });
});

// 🎟 Get user bookings
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  BookingModel.getByUser(userId, (err, bookings) => {
    if (err) return res.status(500).json({ message: "Error fetching user bookings" });
    res.json(bookings);
  });
});

export default router;
