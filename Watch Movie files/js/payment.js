/* ===============================
   Payment System
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const bookingId = params.get("id");

  const bookings = JSON.parse(localStorage.getItem("wm_bookings")) || [];
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    document.body.innerHTML = "<h2>Booking not found!</h2>";
    return;
  }

  document.querySelector("#movieTitle").textContent = booking.movie;
  document.querySelector("#amount").textContent = "₹" + booking.amount;

  document.querySelector("#payNow").addEventListener("click", () => {
    processPayment(booking.amount, "Online", booking.userEmail);
  });
});

function processPayment(amount, method, userEmail) {
  const transaction = {
    id: randomID("TXN"),
    userEmail,
    method,
    amount,
    date: new Date().toISOString(),
    status: "Success",
  };

  const transactions = JSON.parse(localStorage.getItem("wm_transactions")) || [];
  transactions.push(transaction);
  localStorage.setItem("wm_transactions", JSON.stringify(transactions));

  alert("✅ Payment successful!");
  window.location.href = "../invoices/ticket-template.html?id=" + transaction.id;
}
