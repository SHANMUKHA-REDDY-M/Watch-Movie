/* ===============================
   Movies Listing Page
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  renderMovies();
});

function renderMovies() {
  const container = document.querySelector("#movieList");
  if (!container) return;

  const movies = JSON.parse(localStorage.getItem("wm_movies")) || getDefaultMovies();
  container.innerHTML = movies
    .map(
      m => `
      <div class="movie-card">
        <img src="${m.poster}" alt="${m.title}">
        <div class="movie-info">
          <h3>${m.title}</h3>
          <p>${m.genre}</p>
          <p>⭐ ${m.rating}</p>
          <p>₹${m.price}</p>
          <button onclick="viewDetails('${m.id}')">View Details</button>
        </div>
      </div>
    `
    )
    .join("");
}

function viewDetails(id) {
  window.location.href = `movie-details.html?id=${id}`;
}

function getDefaultMovies() {
  const defaultMovies = [
    {
      id: "M001",
      title: "The Grand Escape",
      genre: "Action",
      price: 299,
      rating: 4.5,
      theatre: "CineMax Hyderabad",
      description: "A thrilling story of courage and freedom.",
      poster: "../assets/movie_thriller.jpg",
    },
    {
      id: "M002",
      title: "Ocean Dreams",
      genre: "Romance / Drama",
      price: 249,
      rating: 4.2,
      theatre: "PVR Kukatpally",
      description: "A love story that sails beyond boundaries.",
      poster: "../assets/premier-banner.jpg",
    },
  ];

  localStorage.setItem("wm_movies", JSON.stringify(defaultMovies));
  return defaultMovies;
}
