/* ===============================
   Movie Details Page Logic
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  const movies = JSON.parse(localStorage.getItem("wm_movies")) || [];
  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    document.body.innerHTML = "<h2>Movie not found!</h2>";
    return;
  }

  document.querySelector("#movieTitle").textContent = movie.title;
  document.querySelector("#moviePoster").src = movie.poster;
  document.querySelector("#movieGenre").textContent = movie.genre;
  document.querySelector("#movieDescription").textContent = movie.description;
  document.querySelector("#movieRating").textContent = movie.rating + " ⭐";
  document.querySelector("#movieTheatre").textContent = movie.theatre;
  document.querySelector("#moviePrice").textContent = "₹" + movie.price;

  document.querySelector("#bookNow").addEventListener("click", () => {
    const booking = {
      id: randomID("BOOK"),
      movie: movie.title,
      theatre: movie.theatre,
      price: movie.price,
      date: new Date().toLocaleDateString(),
      time: "7:30 PM",
      seats: 1,
      userEmail: getCurrentUser()?.email || "guest",
      amount: movie.price,
    };

    const bookings = JSON.parse(localStorage.getItem("wm_bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("wm_bookings", JSON.stringify(bookings));

    alert("🎟 Booking added successfully!");
    window.location.href = "payment.html?id=" + booking.id;
  });
});
