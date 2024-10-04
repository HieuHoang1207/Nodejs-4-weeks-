// routes/auth.js
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

// Đường dẫn cho đăng nhập
router.post("/login", (req, res, next) => {
  console.log("Request body:", req.body); // In ra body yêu cầu
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      console.log("Authentication failed:", info); // In ra thông tin nếu không xác thực thành công
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  })(req, res, next);
});

// Đường dẫn cho đăng xuất (nếu cần)
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out" });
  });
});

module.exports = router;
