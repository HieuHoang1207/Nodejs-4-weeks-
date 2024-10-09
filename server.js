const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const setupSwagger = require("./config/swagger");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const homeRoutes = require("./routes/homeRoutes");
const i18n = require("i18n");

const app = express();
const port = process.env.PORT || 3000;

// Ví dụ bài 11
// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,POST", // Cho phép các phương thức này
//   allowedHeaders: ["Content-Type"], // Chỉ cho phép header này
// };
// // Sử dụng middleware CORS
// app.use(cors(corsOptions));
app.use(cors());
// app.use(
//   helmet({
//     hidePoweredBy: true, // Loại bỏ header X-Powered-By để ẩn công nghệ đang sử dụng
//     xssFilter: true, // Bật bộ lọc XSS của trình duyệt
//     dnsPrefetchControl: { allow: false }, // Ngăn chặn DNS prefetching
//   })
// );
app.use(helmet({}));
app.use(bodyParser.json());

// Cấu hình i18n
i18n.configure({
  locales: ["en", "vi"], // Các ngôn ngữ hỗ trợ
  directory: __dirname + "/locales", // Đường dẫn đến thư mục chứa file ngôn ngữ
  defaultLocale: "en", // Ngôn ngữ mặc định
  queryParameter: "lang", // Nếu muốn lấy ngôn ngữ từ query string (không bắt buộc)
  header: "accept-language", // Lấy ngôn ngữ từ header (cũng có thể dùng trường tùy chỉnh)
  autoReload: true, // Tự động tải lại file ngôn ngữ nếu có thay đổi
  updateFiles: false, // Không tự động ghi lại file ngôn ngữ khi thiếu key
  objectNotation: true, // Hỗ trợ truy cập lồng nhau trong file JSON
});

// Sử dụng middleware i18n
app.use(i18n.init);

// Route ví dụ để kiểm tra ngôn ngữ
app.get("/welcome", (req, res) => {
  res.json({
    message: res.__("welcome_message"),
  });
});

app.use("/api/auth", authRoutes);

app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/", homeRoutes);

// Route gây crash hoàn toàn server
app.get("/crash", (req, res) => {
  res.send("Server is about to crash!");

  // Buộc tiến trình dừng
  process.exit(1);
});

setupSwagger(app);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Không tìm thấy đường dẫn!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
