const db = require("../config/database"); // File kết nối MySQL

exports.home = (req, res) => {
  res.status(200).send("Hello World!");
};
