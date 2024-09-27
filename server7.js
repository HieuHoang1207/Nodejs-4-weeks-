const express = require("express");
const mysql = require("mysql2");

// Tạo ứng dụng express
const app = express();

let db;

// Hàm tạo kết nối với cơ sở dữ liệu MySQL
function connectToDatabase() {
  db = mysql.createConnection({
    host: "localhost", // Địa chỉ host của MySQL
    user: "root", // Tên người dùng MySQL
    password: "123456", // Mật khẩu của MySQL
    database: "bai9", // Tên cơ sở dữ liệu
  });

  // Kết nối đến MySQL
  db.connect((err) => {
    if (err) {
      console.error("Kết nối cơ sở dữ liệu thất bại: ", err);
      // Kiểm tra mã lỗi
      if (
        err.code === "ECONNREFUSED" ||
        err.code === "PROTOCOL_CONNECTION_LOST"
      ) {
        console.log("Đang thử kết nối lại sau 5 giây...");
        // Nếu kết nối thất bại, thử lại sau 5 giây
        setTimeout(connectToDatabase, 5000);
      }
    } else {
      console.log("Đã kết nối cơ sở dữ liệu MySQL");
    }
  });

  // Xử lý lỗi kết nối khi đang chạy
  db.on("error", (err) => {
    console.error("Lỗi cơ sở dữ liệu: ", err);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNREFUSED"
    ) {
      // Tự động kết nối lại khi mất kết nối hoặc bị từ chối
      console.log("Mất kết nối với MySQL. Đang thử kết nối lại...");
      setTimeout(connectToDatabase, 5000);
    } else {
      throw err;
    }
  });
}

// Gọi hàm để kết nối lần đầu
connectToDatabase();

// Thiết lập route để test kết nối
app.get("/", (req, res) => {
  res.send("Kết nối thành công với Node.js và MySQL!");
});

// Ví dụ query lấy dữ liệu từ database
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users"; // SQL query
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results); // Trả về dữ liệu dưới dạng JSON
  });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
