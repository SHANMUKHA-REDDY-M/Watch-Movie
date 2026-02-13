import express from "express";
import {
  fetchUsers,
  fetchUserById,
  removeUser
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin"), fetchUsers);
router.get("/:id", authenticate, authorize("admin"), fetchUserById);
router.delete("/:id", authenticate, authorize("admin"), removeUser);

export default router;
