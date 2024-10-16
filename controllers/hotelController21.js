// src/controllers/hotelController21.js
const db = require("../config/db21");

// Lấy danh sách tất cả hotels (SuperAdmin, Admin)
const getAllHotels21 = async (req, res) => {
  try {
    const [hotels] = await db.query("SELECT * FROM hotels");
    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

// Tạo hotel (SuperAdmin, Admin)
const createHotel21 = async (req, res) => {
  const { name, address, description } = req.body;
  try {
    await db.query(
      "INSERT INTO hotels (name, address, description) VALUES (?, ?, ?)",
      [name, address, description]
    );
    res.status(201).json({ message: "Hotel created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating hotel" });
  }
};

// Cập nhật hotel (SuperAdmin, Admin)
const updateHotel21 = async (req, res) => {
  const { id } = req.params;
  const { name, address, description } = req.body;
  try {
    await db.query(
      "UPDATE hotels SET name = ?, address = ?, description = ? WHERE id = ?",
      [name, address, description, id]
    );
    res.status(200).json({ message: "Hotel updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating hotel" });
  }
};

// Xoá hotel (SuperAdmin, Admin)
const deleteHotel21 = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM hotels WHERE id = ?", [id]);
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting hotel" });
  }
};

// User tạo phòng, Admin duyệt phòng
const createRoom21 = async (req, res) => {
  const { hotel_id, name, price } = req.body;
  const userId = req.user.id; // Lấy user từ token
  try {
    await db.query(
      "INSERT INTO rooms (hotel_id, user_id, name, price) VALUES (?, ?, ?, ?)",
      [hotel_id, userId, name, price]
    );
    res.status(201).json({
      message: "Room created successfully, waiting for Admin approval",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating room" });
  }
};

// Admin duyệt phòng
const approveRoom21 = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE rooms SET isApproved = true WHERE id = ?", [id]);
    res.status(200).json({ message: "Room approved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error approving room" });
  }
};

module.exports = {
  getAllHotels21,
  createHotel21,
  updateHotel21,
  deleteHotel21,
  createRoom21,
  approveRoom21,
};
