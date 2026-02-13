import express from "express";
import {
  addMovie,
  fetchMovies,
  fetchMovieById,
  editMovie,
  removeMovie
} from "../controllers/movieController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", fetchMovies);
router.get("/:id", fetchMovieById);

router.post("/", authenticate, authorize("admin"), addMovie);
router.put("/:id", authenticate, authorize("admin"), editMovie);
router.delete("/:id", authenticate, authorize("admin"), removeMovie);

export default router;
