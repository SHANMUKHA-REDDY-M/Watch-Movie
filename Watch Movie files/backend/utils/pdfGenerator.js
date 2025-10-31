import PDFDocument from "pdfkit";
import fs from "fs";

// 🎟️ Generate a PDF ticket for bookings
export const generateTicketPDF = (booking, user, outputPath) => {
  const doc = new PDFDocument();
  const pdfPath = `${outputPath}/ticket_${booking.id}.pdf`;
  doc.pipe(fs.createWriteStream(pdfPath));

  // Header
  doc.fontSize(20).text("🎬 WatchMovies", { align: "center" });
  doc.moveDown();

  // Ticket Details
  doc.fontSize(14).text(`Booking ID: ${booking.id}`);
  doc.text(`Customer: ${user.name}`);
  doc.text(`Movie: ${booking.movie}`);
  doc.text(`Theatre: ${booking.theatre}`);
  doc.text(`Seats: ${booking.seats.join(", ")}`);
  doc.text(`Date: ${booking.date}`);
  doc.text(`Amount Paid: ₹${booking.amount}`);
  doc.moveDown();

  // Footer
  doc.fontSize(10).text("Thank you for choosing WatchMovies!", { align: "center" });
  doc.text("Enjoy your show 🍿", { align: "center" });

  doc.end();
  console.log("✅ Ticket generated:", pdfPath);
  return pdfPath;
};
