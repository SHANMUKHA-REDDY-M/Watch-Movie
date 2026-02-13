import db from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = db.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).get(email);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  ).run(name, email, hashedPassword);

  res.status(201).json({ message: 'User registered successfully' });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).get(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
};
