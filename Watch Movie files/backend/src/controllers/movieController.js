import db from '../config/database.js';

export const createMovie = (req, res) => {
  const { title, description, duration } = req.body;

  db.prepare(
    'INSERT INTO movies (title, description, duration) VALUES (?, ?, ?)'
  ).run(title, description, duration);

  res.status(201).json({ message: 'Movie created' });
};

export const getMovies = (req, res) => {
  const movies = db.prepare('SELECT * FROM movies').all();
  res.json(movies);
};
