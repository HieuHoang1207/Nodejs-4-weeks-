// src/controllers/userController21.js
const db = require("../config/db21");

// Lấy danh sách user (SuperAdmin)
const getAllUsers21 = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Xóa Admin hoặc User (SuperAdmin)
const deleteUser21 = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  getAllUsers21,
  deleteUser21,
};
