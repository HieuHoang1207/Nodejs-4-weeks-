// src/config/db21.js
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "bai21_nodejs",
});

module.exports = db;
