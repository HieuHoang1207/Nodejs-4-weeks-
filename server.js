const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const setupSwagger = require("./swagger");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/", homeRoutes);

setupSwagger(app);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Không tìm thấy đường dẫn!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
