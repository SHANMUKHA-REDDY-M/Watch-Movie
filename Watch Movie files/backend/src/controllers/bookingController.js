import db from '../config/database.js';

export const createBooking = (req, res) => {
  const { userId, movieId, theatreId, showTime, seats } = req.body;

  const transaction = db.transaction(() => {
    db.prepare(
      `INSERT INTO bookings 
      (userId, movieId, theatreId, showTime, seats) 
      VALUES (?, ?, ?, ?, ?)`
    ).run(userId, movieId, theatreId, showTime, seats);
  });

  transaction();

  res.status(201).json({ message: 'Booking successful' });
};
