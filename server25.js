const express = require("express");
const hotelController = require("./controllers/hotelController25");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware log request để kiểm tra
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/hotels/:id", hotelController.getHotel);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
