const nodemailer = require("nodemailer");
require("dotenv").config();

// Cấu hình transporter cho Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hieu.mh7@gmail.com", // Địa chỉ Gmail của bạn
    pass: process.env.GMAIL_APP_PASS, // Mật khẩu ứng dụng hoặc OAuth2
  },
});

// Tạo hàm gửi email
exports.sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: "hieu.mh7@gmail.com",
      to: email,
      subject: "Welcome to Gooup1!",
      html: `
                <h1>Hello, ${name}!</h1>
                <p>Thank you for registering on Gooup1. We are excited to have you!</p>
                <footer>Chào mừng bạn đến với Gooup1</footer>
            `,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
