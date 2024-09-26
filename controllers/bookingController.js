const db = require("../config/database");

// Lấy danh sách booking của người dùng
exports.getBookingsByUserId = (req, res) => {
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

  db.query(sql, [userId, limit, offset], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn: ", err);
      return res.status(500).send("Lỗi truy vấn dữ liệu");
    }

    res.status(200).json(results);
  });
};

// Lấy chi tiết booking theo bookingId
exports.getBookingById = (req, res) => {
  const userId = req.params.userId;
  const bookingId = req.params.bookingId;

  const sql = `
    SELECT r.*, res.*, u.name AS userName 
    FROM reservations res
    JOIN rooms r ON res.room_id = r.id
    JOIN users u ON res.user_id = u.id
    WHERE res.id = ? AND u.id = ?`;

  db.query(sql, [bookingId, userId], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn: ", err);
      return res.status(500).send("Lỗi truy vấn dữ liệu");
    }

    if (results.length === 0) {
      return res.status(404).send("Không tìm thấy booking");
    }

    res.status(200).json(results[0]);
  });
};
