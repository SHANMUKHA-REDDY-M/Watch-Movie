import { connectDB } from "../config/database.js";

export const createBooking = async ({
  userId,
  movieId,
  theatreId,
  showTime,
  seats,
  totalAmount
}) => {
  const db = await connectDB();

  const result = await db.run(
    `INSERT INTO bookings 
     (userId, movieId, theatreId, showTime, seats, totalAmount)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userId,
      movieId,
      theatreId,
      showTime,
      JSON.stringify(seats),
      totalAmount
    ]
  );

  return {
    id: result.lastID,
    userId,
    movieId,
    theatreId,
    showTime,
    seats,
    totalAmount
  };
};

export const getBookingsByUser = async (userId) => {
  const db = await connectDB();

  const bookings = await db.all(
    `SELECT * FROM bookings
     WHERE userId = ?
     ORDER BY createdAt DESC`,
    [userId]
  );

  return bookings.map(b => ({
    ...b,
    seats: JSON.parse(b.seats)
  }));
};

export const getAllBookings = async () => {
  const db = await connectDB();

  const bookings = await db.all(
    `SELECT * FROM bookings
     ORDER BY createdAt DESC`
  );

  return bookings.map(b => ({
    ...b,
    seats: JSON.parse(b.seats)
  }));
};

export const getBookedSeats = async (movieId, theatreId, showTime) => {
  const db = await connectDB();

  const bookings = await db.all(
    `SELECT seats FROM bookings
     WHERE movieId = ?
     AND theatreId = ?
     AND showTime = ?`,
    [movieId, theatreId, showTime]
  );

  const allSeats = bookings.flatMap(b => JSON.parse(b.seats));

  return allSeats;
};

export const deleteBooking = async (id) => {
  const db = await connectDB();

  return db.run(
    `DELETE FROM bookings
     WHERE id = ?`,
    [id]
  );
};
