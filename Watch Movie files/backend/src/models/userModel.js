import { connectDB } from "../config/database.js";

export const createUser = async ({ name, email, password, role = "user" }) => {
  const db = await connectDB();

  const result = await db.run(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, password, role]
  );

  return { id: result.lastID, name, email, role };
};

export const findUserByEmail = async (email) => {
  const db = await connectDB();

  return db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );
};

export const findUserById = async (id) => {
  const db = await connectDB();

  return db.get(
    `SELECT id, name, email, role, createdAt
     FROM users
     WHERE id = ?`,
    [id]
  );
};

export const getAllUsers = async () => {
  const db = await connectDB();

  return db.all(
    `SELECT id, name, email, role, createdAt
     FROM users
     ORDER BY createdAt DESC`
  );
};

export const deleteUserById = async (id) => {
  const db = await connectDB();

  return db.run(
    `DELETE FROM users WHERE id = ?`,
    [id]
  );
};
