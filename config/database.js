const mysql = require("mysql2");

// Tạo connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "bai9",
  waitForConnections: true,
  connectionLimit: 10, // Số lượng kết nối tối đa
  queueLimit: 0, // Không giới hạn số lượng truy vấn trong hàng chờ
});

// Sử dụng pool để quản lý kết nối MySQL, không cần hàm connectToDatabase
pool.on("connection", (connection) => {
  console.log("MySQL pool connected: threadId " + connection.threadId);
});

pool.on("error", (err) => {
  console.error("Lỗi cơ sở dữ liệu: ", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNREFUSED") {
    console.log("Mất kết nối với MySQL. Đang thử kết nối lại...");
  } else {
    throw err;
  }
});

// Export pool với promise để dễ quản lý các truy vấn
module.exports = pool.promise();
