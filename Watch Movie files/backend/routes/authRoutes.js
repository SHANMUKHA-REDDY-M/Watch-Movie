import express from "express";
import { UserModel } from "../models/User.js";

const router = express.Router();

// 🧩 Register new user
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({ message: "All fields are required" });

  UserModel.findByEmail(email, (err, user) => {
    if (user) return res.status(400).json({ message: "User already exists" });

    UserModel.create({ name, email, password, role }, (err, newUser) => {
      if (err) return res.status(500).json({ message: "Error registering user" });
      res.json({ message: "User registered successfully", user: newUser });
    });
  });
});

// 🔐 Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserModel.findByEmail(email, (err, user) => {
    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  });
});

export default router;
