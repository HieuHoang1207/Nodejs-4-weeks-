const express = require("express");
const app = express();

// Middleware để log thông tin request
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
};

// Sử dụng middleware logger
app.use(loggerMiddleware);
app.use(express.json()); // Để xử lý JSON body

// Route cơ bản với phương thức GET
app.get("/", (req, res) => {
  res.status(200).send("Hello, worldd. Xin chào, đây là trang chủ!");
});

// Route để trả về dữ liệu JSON
app.get("/api/data", (req, res) => {
  res.status(200).json({ message: "Dữ liệu đã được trả về thành công!" });
});

// Middleware để xử lý lỗi 404
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).json({ error: "Không tìm thấy đường dẫn!" });
});

// Khởi chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
