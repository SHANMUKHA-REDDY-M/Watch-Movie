// controllers/bookingController.js
import bookings from "../db/seed.json" assert { type: "json" };
import { generateTicketPDF } from "../utils/pdfGenerator.js";
import { processPayment } from "../utils/paymentGatewayMock.js";

export const createBooking = (req, res) => {
  const { userId, movieId, seats, paymentMethod } = req.body;
  if (!userId || !movieId || !seats)
    return res.status(400).json({ message: "Missing booking details" });

  const payment = processPayment(seats.length * 250, paymentMethod, userId);
  const newBooking = {
    id: Date.now(),
    userId,
    movieId,
    seats,
    status: "confirmed",
    payment,
    date: new Date().toISOString(),
  };
  bookings.push(newBooking);

  generateTicketPDF(newBooking);
  res.status(201).json({ message: "Booking successful", booking: newBooking });
};

export const getUserBookings = (req, res) => {
  const userId = parseInt(req.params.userId);
  const userBookings = bookings.filter(b => b.userId === userId);
  res.json(userBookings);
};
