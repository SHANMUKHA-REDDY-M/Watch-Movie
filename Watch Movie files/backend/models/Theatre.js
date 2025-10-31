import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./backend/db/moviehub.db");

// Theatre model: manages theatre and screen data
export const TheatreModel = {
  createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS theatres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      location TEXT,
      capacity INTEGER
    )`);
  },

  getAll(callback) {
    db.all("SELECT * FROM theatres", [], (err, rows) => callback(err, rows));
  },

  getById(id, callback) {
    db.get("SELECT * FROM theatres WHERE id = ?", [id], (err, row) => callback(err, row));
  },

  create(theatre, callback) {
    const { name, location, capacity } = theatre;
    db.run(
      "INSERT INTO theatres (name, location, capacity) VALUES (?, ?, ?)",
      [name, location, capacity],
      function (err) {
        callback(err, { id: this?.lastID, ...theatre });
      }
    );
  }
};
