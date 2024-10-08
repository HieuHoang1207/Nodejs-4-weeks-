// src/controllers/authController21.js
const { getUserByEmail } = require("../models/user21");
const jwt = require("jsonwebtoken");

const login21 = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, "secret_key");
  res.json({ token });
};

module.exports = {
  login21,
};
