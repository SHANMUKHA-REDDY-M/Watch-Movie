/* ===============================
   User Dashboard
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("wm_currentUser"));
  if (!user) return (window.location.href = "../login.html");

  document.querySelector("#userName").textContent = user.name;
  renderBookings();
});

function renderBookings() {
  const bookings = JSON.parse(localStorage.getItem("wm_bookings")) || [];
  const container = document.querySelector("#bookingList");
  if (!container) return;

  const user = JSON.parse(localStorage.getItem("wm_currentUser"));
  const myBookings = bookings.filter(b => b.userEmail === user.email);

  container.innerHTML = myBookings.length
    ? myBookings
        .map(
          b => `
      <div class="booking-card">
        <h3>${b.movie}</h3>
        <p><b>Date:</b> ${b.date} | <b>Show:</b> ${b.time}</p>
        <p><b>Seats:</b> ${b.seats} | <b>Amount:</b> ₹${b.amount}</p>
        <button onclick="viewTicket('${b.id}')">🎟 View Ticket</button>
      </div>`
        )
        .join("")
    : `<p>No bookings yet.</p>`;
}

function viewTicket(id) {
  window.location.href = `../invoices/ticket-template.html?id=${id}`;
}
