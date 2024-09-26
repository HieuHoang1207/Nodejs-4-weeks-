const db = require("../config/database"); // File kết nối MySQL

// Lấy danh sách người dùng
exports.getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn: ", err);
      return res.status(500).send("Lỗi truy vấn dữ liệu");
    }
    res.status(200).json(results);
  });
};

// Lấy thông tin người dùng theo ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn: ", err);
      return res.status(500).send("Lỗi truy vấn dữ liệu");
    }
    if (results.length === 0) {
      return res.status(404).send("Người dùng không tìm thấy");
    }
    res.status(200).json(results[0]);
  });
};

// Tạo người dùng mới
exports.createUser = (req, res) => {
  // Logic thêm người dùng mới
  res.status(201).send("Người dùng mới đã được tạo!");
};

// Cập nhật người dùng
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  res.status(200).send(`Người dùng ${userId} đã được cập nhật!`);
};

// Xóa người dùng
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  res.status(204).send();
};
