import express from "express";
import {
  bookTickets,
  myBookings,
  fetchAllBookings
} from "../controllers/bookingController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authenticate, bookTickets);
router.get("/me", authenticate, myBookings);
router.get("/", authenticate, authorize("admin"), fetchAllBookings);

export default router;
