const express = require("express");
const authController = require("../controllers/authControllerFB");
const router = express.Router();

// Đăng nhập bằng Facebook
router.get("/auth/facebook", authController.facebookLogin);

// Callback sau khi Facebook xác thực
router.get("/auth/facebook/callback", authController.facebookCallback);

// Route để lấy thông tin profile của user
router.get("/profile", authController.getProfile);

module.exports = router;
