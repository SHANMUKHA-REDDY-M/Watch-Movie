// controllers/authController.js
import users from "../db/seed.json" assert { type: "json" };

export const registerUser = (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const newUser = { id: Date.now(), name, email, password, role };
  users.push(newUser);
  res.status(201).json({ message: "Registration successful", user: newUser });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  res.json({ message: "Login successful", user });
};
