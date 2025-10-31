import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./backend/db/moviehub.db");

// Movie model: stores and retrieves movies
export const MovieModel = {
  createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      genre TEXT,
      duration INTEGER,
      language TEXT,
      rating REAL,
      theatreId INTEGER
    )`);
  },

  getAll(callback) {
    db.all("SELECT * FROM movies", [], (err, rows) => callback(err, rows));
  },

  getById(id, callback) {
    db.get("SELECT * FROM movies WHERE id = ?", [id], (err, row) => callback(err, row));
  },

  create(movie, callback) {
    const { title, genre, duration, language, rating, theatreId } = movie;
    db.run(
      "INSERT INTO movies (title, genre, duration, language, rating, theatreId) VALUES (?, ?, ?, ?, ?, ?)",
      [title, genre, duration, language, rating, theatreId],
      function (err) {
        callback(err, { id: this?.lastID, ...movie });
      }
    );
  }
};
