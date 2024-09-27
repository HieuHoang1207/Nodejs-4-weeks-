const db = require("../config/database");

// Lấy danh sách booking của người dùng
exports.getBookingsByUserId = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT r.*, res.*, u.name AS userName 
    FROM reservations res
    JOIN rooms r ON res.room_id = r.id
    JOIN users u ON res.user_id = u.id
    WHERE u.id = ?
    ORDER BY res.checkin DESC
    LIMIT ? OFFSET ?`;

  try {
    const [results] = await db.query(sql, [userId, limit, offset]);
    res.status(200).json(results);
  } catch (err) {
    console.error("Lỗi truy vấn: ", err);
    res.status(500).send("Lỗi truy vấn dữ liệu");
  }
};

// Lấy chi tiết booking theo bookingId
exports.getBookingById = async (req, res) => {
  const userId = req.params.userId;
  const bookingId = req.params.bookingId;

  const sql = `
    SELECT r.*, res.*, u.name AS userName 
    FROM reservations res
    JOIN rooms r ON res.room_id = r.id
    JOIN users u ON res.user_id = u.id
    WHERE res.id = ? AND u.id = ?`;

  try {
    const [results] = await db.query(sql, [bookingId, userId]);
    if (results.length === 0) {
      return res.status(404).send("Không tìm thấy booking");
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error("Lỗi truy vấn: ", err);
    res.status(500).send("Lỗi truy vấn dữ liệu");
  }
};
