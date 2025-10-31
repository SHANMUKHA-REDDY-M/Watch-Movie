// controllers/adminController.js
import users from "../db/seed.json" assert { type: "json" };
import bookings from "../db/seed.json" assert { type: "json" };
import theatres from "../api/theatres.json" assert { type: "json" };

export const getDashboardStats = (req, res) => {
  const totalUsers = users.length;
  const totalBookings = bookings.length;
  const totalMovies = theatres.length;

  res.json({
    totalUsers,
    totalBookings,
    totalMovies,
    revenue: totalBookings * 250,
  });
};

export const getAllUsers = (req, res) => {
  res.json(users);
};

export const getAllBookings = (req, res) => {
  res.json(bookings);
};

export const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
};
