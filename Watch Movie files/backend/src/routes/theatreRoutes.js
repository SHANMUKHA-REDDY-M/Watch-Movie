import express from "express";
import {
  addTheatre,
  fetchTheatres,
  editTheatre,
  removeTheatre
} from "../controllers/theatreController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", fetchTheatres);

router.post("/", authenticate, authorize("admin"), addTheatre);
router.put("/:id", authenticate, authorize("admin"), editTheatre);
router.delete("/:id", authenticate, authorize("admin"), removeTheatre);

export default router;
