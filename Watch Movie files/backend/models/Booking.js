import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./backend/db/moviehub.db");

// Booking model: links users, movies, and theatres
export const BookingModel = {
  createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      movieId INTEGER,
      seats TEXT,
      status TEXT,
      paymentId TEXT,
      date TEXT
    )`);
  },

  getAll(callback) {
    db.all("SELECT * FROM bookings", [], (err, rows) => callback(err, rows));
  },

  getByUser(userId, callback) {
    db.all("SELECT * FROM bookings WHERE userId = ?", [userId], (err, rows) => callback(err, rows));
  },

  create(booking, callback) {
    const { userId, movieId, seats, status, paymentId, date } = booking;
    db.run(
      "INSERT INTO bookings (userId, movieId, seats, status, paymentId, date) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, movieId, JSON.stringify(seats), status, paymentId, date],
      function (err) {
        callback(err, { id: this?.lastID, ...booking });
      }
    );
  }
};
