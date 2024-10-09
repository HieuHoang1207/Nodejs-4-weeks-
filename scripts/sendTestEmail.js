const mailService = require("../services/emailService22");

// Gửi email chào mừng
mailService.sendWelcomeEmail(
  "julyfall1207+42224333@gmail.com",
  "Hieu Dinh",
  "Welcome to Gooup1!",
  "Thank you for registering on Gooup1. We are excited to have you!"
);

// // Gửi email thông báo khác
// mailService.sendWelcomeEmail(
//   "user@example.com",
//   "Jane Doe",
//   "Important Update",
//   "We have some new features coming soon!"
// );
