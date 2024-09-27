const db = require("../config/database"); // File kết nối MySQL

// Lấy danh sách người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM users");
    res.status(200).json(results);
  } catch (err) {
    console.error("Lỗi truy vấn: ", err);
    res.status(500).send("Lỗi truy vấn dữ liệu");
  }
};

// Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  try {
    const [results] = await db.query(sql, [userId]);
    if (results.length === 0) {
      return res.status(404).send("Người dùng không tìm thấy");
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error("Lỗi truy vấn: ", err);
    res.status(500).send("Lỗi truy vấn dữ liệu");
  }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
  // Logic thêm người dùng mới
  try {
    const { name, email } = req.body;
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    await db.query(sql, [name, email]);
    res.status(201).send("Người dùng mới đã được tạo!");
  } catch (err) {
    console.error("Lỗi tạo người dùng: ", err);
    res.status(500).send("Lỗi tạo người dùng");
  }
};

// Cập nhật người dùng
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  try {
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    await db.query(sql, [name, email, userId]);
    res.status(200).send(`Người dùng ${userId} đã được cập nhật!`);
  } catch (err) {
    console.error("Lỗi cập nhật người dùng: ", err);
    res.status(500).send("Lỗi cập nhật người dùng");
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const sql = "DELETE FROM users WHERE id = ?";
    await db.query(sql, [userId]);
    res.status(204).send();
  } catch (err) {
    console.error("Lỗi xóa người dùng: ", err);
    res.status(500).send("Lỗi xóa người dùng");
  }
};
