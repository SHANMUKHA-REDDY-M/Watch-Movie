import express from 'express';
import dotenv from 'dotenv';
import { initializeTables } from './config/database.js';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize DB
initializeTables();

app.get('/', (req, res) => {
  res.send('Movie Booking API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
