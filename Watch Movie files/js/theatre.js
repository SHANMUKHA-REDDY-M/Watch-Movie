/* ===============================
   Theatre Dashboard
   =============================== */

function addMovie(movie) {
  const theatres = JSON.parse(localStorage.getItem("wm_theatres")) || [];
  const user = JSON.parse(localStorage.getItem("wm_currentUser"));

  const theatre = theatres.find(t => t.ownerEmail === user.email);
  if (theatre) {
    theatre.movies.push(movie);
    localStorage.setItem("wm_theatres", JSON.stringify(theatres));
    alert("Movie added successfully!");
  } else {
    alert("Theatre not found for this user.");
  }
}
