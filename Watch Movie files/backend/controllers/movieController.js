// controllers/movieController.js
import movies from "../api/theatres.json" assert { type: "json" };

export const getAllMovies = (req, res) => {
  res.json(movies);
};

export const getMovieById = (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
};
