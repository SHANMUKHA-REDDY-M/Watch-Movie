/* ===============================
   Admin Panel
   =============================== */

function loadAdminDashboard() {
  const stats = {
    users: JSON.parse(localStorage.getItem("wm_users"))?.length || 0,
    theatres: JSON.parse(localStorage.getItem("wm_theatres"))?.length || 0,
    bookings: JSON.parse(localStorage.getItem("wm_bookings"))?.length || 0,
  };

  document.getElementById("totalUsers").textContent = stats.users;
  document.getElementById("totalTheatres").textContent = stats.theatres;
  document.getElementById("totalBookings").textContent = stats.bookings;
}
