/* ===============================
   Ticket / Invoice Generator
   =============================== */

function generateTicket(bookingId) {
  const bookings = JSON.parse(localStorage.getItem("wm_bookings")) || [];
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return alert("Booking not found!");

  const w = window.open("", "_blank");
  w.document.write(`
    <html><head><title>Watch Movies Ticket</title>
    <link rel="stylesheet" href="../css/style.css"></head>
    <body>
      <h2>🎬 Watch Movies - Ticket</h2>
      <p><b>Movie:</b> ${booking.movie}</p>
      <p><b>Theatre:</b> ${booking.theatre}</p>
      <p><b>Seats:</b> ${booking.seats}</p>
      <p><b>Date:</b> ${booking.date}</p>
      <p><b>Show Time:</b> ${booking.time}</p>
      <p><b>Total:</b> ₹${booking.amount}</p>
      <button onclick="window.print()">Print Ticket</button>
    </body></html>
  `);
  w.document.close();
}
