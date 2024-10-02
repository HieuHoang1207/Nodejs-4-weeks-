// authRoutes.js
const express = require("express");
const { signup, login } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup); // Đăng ký
router.post("/login", login); // Đăng nhập
router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    message: "Bạn đã truy cập thành công vào route bảo vệ!",
    user: req.user, // Thông tin user từ token đã giải mã
  });
});

module.exports = router;
