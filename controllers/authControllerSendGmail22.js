// authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/database"); // Kết nối đến cơ sở dữ liệu
const emailService = require("../services/emailService22");

// Mã hóa mật khẩu
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const createToken = (user) => {
  const createdTime = Date.now(); // Thời gian tạo token
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      createdTime, // Thêm thông tin thời gian tạo vào payload
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN, // Thời gian hết hạn token
    }
  );
};

// Đăng ký
exports.signupSendGmail = async (req, res) => {
  try {
    const { email, password, name } = req.body; // Thêm name từ request body
    const hashedPassword = await hashPassword(password);

    // Kiểm tra email đã tồn tại chưa
    const emailCheckQuery = "SELECT * FROM users WHERE email = ?";
    db.query(emailCheckQuery, [email], (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }

      // Lưu thông tin user vào cơ sở dữ liệu
      const query =
        "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
      db.query(query, [email, hashedPassword, name], (error, results) => {
        if (error) {
          return res.status(500).json({ message: "Đã xảy ra lỗi", error });
        }

        const newUser = { id: results.insertId, email, name };
        const token = createToken(newUser);
        res.status(201).json({ message: "Đăng ký thành công", token });

        // Gửi email chào mừng sau khi đăng ký thành công
        emailService.sendWelcomeEmail(email, name);
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
};
