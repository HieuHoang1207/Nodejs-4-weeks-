// src/routes/userRoutes21.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers21,
  deleteUser21,
} = require("../controllers/userController21");
const checkRole21 = require("../middlewares/checkRole21");

// Routes cho user
router.get("/", checkRole21(["Admin", "SuperAdmin"]), getAllUsers21);
router.delete("/:id", checkRole21(["SuperAdmin"]), deleteUser21);

module.exports = router;
