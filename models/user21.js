// src/models/user21.js
const db = require("../config/db21");

const getUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

module.exports = {
  getUserByEmail,
};
