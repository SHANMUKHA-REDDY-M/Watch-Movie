/* ===============================
   Utilities
   =============================== */

function formatCurrency(num) {
  return "₹" + num.toFixed(2);
}

function randomID(prefix = "ID") {
  return `${prefix}${Math.floor(Math.random() * 10000)}`;
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("wm_currentUser"));
}

function logout() {
  localStorage.removeItem("wm_currentUser");
  window.location.href = "../login.html";
}
