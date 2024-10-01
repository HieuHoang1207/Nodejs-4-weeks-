const mysql = require("mysql2");
require("dotenv").config();

let db;
let retryAttempts = 0;
const maxRetries = 5;

function connectToDatabase() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
      console.error("Kết nối cơ sở dữ liệu thất bại: ", err);
      if (retryAttempts < maxRetries) {
        retryAttempts++;
        console.log(
          `Đang thử kết nối lại (thử ${retryAttempts}/${maxRetries}) sau 5 giây...`
        );
        setTimeout(connectToDatabase, 5000);
      } else {
        console.log("Đã đạt giới hạn số lần thử kết nối lại.");
      }
    } else {
      console.log("Đã kết nối cơ sở dữ liệu MySQL");
      retryAttempts = 0;
    }
  });

  db.on("error", (err) => {
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNREFUSED"
    ) {
      connectToDatabase();
    }
  });
}

connectToDatabase();

module.exports = db;
