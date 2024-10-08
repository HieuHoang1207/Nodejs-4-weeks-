// src/app21.js
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes21");
const hotelRoutes = require("./routes/hotelRoutes21");
const userRoutes = require("./routes/userRoutes21");
const jwt = require("jsonwebtoken");
const PORT = 3000;

app.use(express.json());

// Middleware để xác thực user
// src/app21.js
app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return next(); // Không có token thì bỏ qua bước xác thực và chuyển sang middleware khác
  }

  jwt.verify(token, "secret_key", (err, user) => {
    console.log("Token:", token); // Kiểm tra token
    console.log("User:", user); // Kiểm tra thông tin user sau khi xác thực
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Lưu thông tin user sau khi xác thực thành công
    next();
  });
});

// Sử dụng các routes
app.use("/auth", authRoutes);
app.use("/hotels", hotelRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
