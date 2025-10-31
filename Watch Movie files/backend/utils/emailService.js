import nodemailer from "nodemailer";

// ✉️ Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password" // use app password for Gmail
  }
});

// 📩 Send booking confirmation
export const sendBookingEmail = async (userEmail, bookingDetails) => {
  const mailOptions = {
    from: "WatchMovies <no-reply@watchmovies.com>",
    to: userEmail,
    subject: "🎟️ Booking Confirmation - WatchMovies",
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Thank you for booking with <b>WatchMovies</b>.</p>
      <p><b>Movie:</b> ${bookingDetails.movie}</p>
      <p><b>Theatre:</b> ${bookingDetails.theatre}</p>
      <p><b>Seats:</b> ${bookingDetails.seats.join(", ")}</p>
      <p><b>Date:</b> ${bookingDetails.date}</p>
      <p><b>Total Paid:</b> ₹${bookingDetails.amount}</p>
      <hr>
      <p>Enjoy your movie! 🍿</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Booking email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};
