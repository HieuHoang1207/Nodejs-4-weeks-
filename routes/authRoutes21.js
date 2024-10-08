// src/routes/authRoutes21.js
const express = require("express");
const router = express.Router();
const { login21 } = require("../controllers/authController21");

router.post("/login", login21);

module.exports = router;
