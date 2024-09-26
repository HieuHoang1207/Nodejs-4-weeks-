const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/", homeRoutes);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Không tìm thấy đường dẫn!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
