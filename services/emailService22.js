const nodemailer = require("nodemailer");
const { generateEmailTemplate } = require("../templates/emailTemplate");
require("dotenv").config();

// Cấu hình transporter cho Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hieu.mh7@gmail.com", // Địa chỉ Gmail của bạn
    pass: process.env.GMAIL_APP_PASS, // Mật khẩu ứng dụng hoặc OAuth2
  },
});

// Hàm gửi email với template
exports.sendWelcomeEmail = async (email, name, subject, content) => {
  try {
    const mailOptions = {
      from: "hieu.mh7@gmail.com",
      to: email,
      subject: subject,
      html: generateEmailTemplate(name, content), // Sử dụng template đã tạo
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
