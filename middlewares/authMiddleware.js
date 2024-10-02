const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  // Lấy token từ header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
  }

  // Xác thực và giải mã token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    // Kiểm tra thời gian tạo token
    const currentTime = Date.now();
    const tokenCreatedTime = decoded.createdTime;

    // Nếu token được tạo hơn 15 phút thì từ chối truy cập
    if (currentTime - tokenCreatedTime > 15 * 60 * 1000) {
      // 15 phút
      return res.status(403).json({ message: "Token đã hết hạn" });
    }

    // Giải mã token và log thông tin
    console.log("Decoded Token:", decoded);

    // Lưu thông tin người dùng vào request
    req.user = decoded;

    // Tiếp tục xử lý
    next();
  });
};
