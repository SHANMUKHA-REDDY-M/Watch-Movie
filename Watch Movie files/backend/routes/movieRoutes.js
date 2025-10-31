import express from "express";
import { MovieModel } from "../models/Movie.js";

const router = express.Router();

// 🎬 Get all movies
router.get("/", (req, res) => {
  MovieModel.getAll((err, movies) => {
    if (err) return res.status(500).json({ message: "Error fetching movies" });
    res.json(movies);
  });
});

// 🎬 Add new movie
router.post("/", (req, res) => {
  const movie = req.body;
  MovieModel.create(movie, (err, newMovie) => {
    if (err) return res.status(500).json({ message: "Error adding movie" });
    res.json({ message: "Movie added successfully", movie: newMovie });
  });
});

// 🎬 Get single movie by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  MovieModel.getById(id, (err, movie) => {
    if (err || !movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  });
});

export default router;
