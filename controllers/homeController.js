const db = require("../config/database"); // File kết nối MySQL

// Tạo người dùng mới
exports.home = (req, res) => {
  // Logic thêm người dùng mới
  res.status(200).send("Hello World!");
};
