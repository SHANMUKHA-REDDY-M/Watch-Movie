import { connectDB } from "../config/database.js";

export const createMovie = async ({ title, genre, duration, price }) => {
  const db = await connectDB();

  const result = await db.run(
    `INSERT INTO movies (title, genre, duration, price)
     VALUES (?, ?, ?, ?)`,
    [title, genre, duration, price]
  );

  return {
    id: result.lastID,
    title,
    genre,
    duration,
    price
  };
};

export const getAllMovies = async () => {
  const db = await connectDB();

  return db.all(
    `SELECT * FROM movies
     ORDER BY createdAt DESC`
  );
};

export const getMovieById = async (id) => {
  const db = await connectDB();

  return db.get(
    `SELECT * FROM movies
     WHERE id = ?`,
    [id]
  );
};

export const updateMovie = async (id, { title, genre, duration, price }) => {
  const db = await connectDB();

  await db.run(
    `UPDATE movies
     SET title = ?, genre = ?, duration = ?, price = ?
     WHERE id = ?`,
    [title, genre, duration, price, id]
  );

  return getMovieById(id);
};

export const deleteMovie = async (id) => {
  const db = await connectDB();

  return db.run(
    `DELETE FROM movies
     WHERE id = ?`,
    [id]
  );
};
