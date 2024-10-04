// server.js
require("dotenv").config(); // Thêm dòng này

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware để phân tích body
app.use(express.urlencoded({ extended: false }));

// Cấu hình session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Sử dụng biến môi trường
    resave: false,
    saveUninitialized: true,
  })
);

// Khởi tạo passport
app.use(passport.initialize());
app.use(passport.session());

// Sử dụng các route xác thực
app.use("/auth", authRoutes);

// Khởi động server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
