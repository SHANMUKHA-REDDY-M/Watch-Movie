import { connectDB } from "../config/database.js";

export const createTheatre = async ({ name, location }) => {
  const db = await connectDB();

  const result = await db.run(
    `INSERT INTO theatres (name, location)
     VALUES (?, ?)`,
    [name, location]
  );

  return {
    id: result.lastID,
    name,
    location
  };
};

export const getAllTheatres = async () => {
  const db = await connectDB();

  return db.all(
    `SELECT *
     FROM theatres
     ORDER BY createdAt DESC`
  );
};

export const getTheatreById = async (id) => {
  const db = await connectDB();

  return db.get(
    `SELECT *
     FROM theatres
     WHERE id = ?`,
    [id]
  );
};

export const updateTheatre = async (id, { name, location }) => {
  const db = await connectDB();

  await db.run(
    `UPDATE theatres
     SET name = ?, location = ?
     WHERE id = ?`,
    [name, location, id]
  );

  return getTheatreById(id);
};

export const deleteTheatre = async (id) => {
  const db = await connectDB();

  return db.run(
    `DELETE FROM theatres
     WHERE id = ?`,
    [id]
  );
};
