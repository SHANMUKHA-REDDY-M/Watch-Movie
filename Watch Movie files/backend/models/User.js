import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./backend/db/moviehub.db");

// User model: handles authentication and user CRUD
export const UserModel = {
  createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'user'
    )`);
  },

  getAll(callback) {
    db.all("SELECT * FROM users", [], (err, rows) => callback(err, rows));
  },

  findByEmail(email, callback) {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => callback(err, row));
  },

  create(user, callback) {
    const { name, email, password, role } = user;
    db.run(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role],
      function (err) {
        callback(err, { id: this?.lastID, ...user });
      }
    );
  }
};
