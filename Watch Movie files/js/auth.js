/* ===============================
   Authentication (User/Admin)
   =============================== */

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("wm_users")) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("wm_currentUser", JSON.stringify(user));
    alert(`Welcome back, ${user.name}!`);
    window.location.href = user.role === "admin" ? "admin/dashboard.html" : "user/dashboard.html";
  } else {
    alert("Invalid email or password!");
  }
}

function registerUser(name, email, password, role = "user") {
  const users = JSON.parse(localStorage.getItem("wm_users")) || [];
  if (users.some(u => u.email === email)) {
    alert("Email already registered!");
    return;
  }
  users.push({ name, email, password, role });
  localStorage.setItem("wm_users", JSON.stringify(users));
  alert("Registration successful! Please login.");
  window.location.href = "login.html";
}
