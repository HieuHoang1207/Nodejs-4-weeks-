const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello, worldd. Xin chào, đây là trang chủ!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
