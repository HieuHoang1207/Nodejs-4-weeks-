// authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/database"); // Kết nối đến cơ sở dữ liệu

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
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    // Lưu thông tin user vào cơ sở dữ liệu
    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(query, [email, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Đã xảy ra lỗi", error });
      }

      const newUser = { id: results.insertId, email };
      const token = createToken(newUser);
      res.status(201).json({ message: "Đăng ký thành công", token });
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user từ database
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (error, results) => {
      if (error || results.length === 0) {
        return res
          .status(400)
          .json({ message: "Mật khẩu hoặc email không đúng" });
      }

      const user = results[0];

      // Kiểm tra mật khẩu
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Mật khẩu" });
      }

      const token = createToken(user);
      res.status(200).json({ message: "Đăng nhập thành công", token });
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
};
