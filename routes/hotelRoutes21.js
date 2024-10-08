// src/routes/hotelRoutes21.js
const express = require("express");
const router = express.Router();
const {
  getAllHotels21,
  createHotel21,
  updateHotel21,
  deleteHotel21,
  createRoom21,
  approveRoom21,
} = require("../controllers/hotelController21");
const checkRole21 = require("../middlewares/checkRole21");

// Routes cho hotel
router.get("/", checkRole21(["Admin", "SuperAdmin"]), getAllHotels21);
router.post("/", checkRole21(["Admin", "SuperAdmin"]), createHotel21);
router.put("/:id", checkRole21(["Admin", "SuperAdmin"]), updateHotel21);
router.delete("/:id", checkRole21(["SuperAdmin"]), deleteHotel21);

// Routes cho rooms
router.post("/room", checkRole21(["User"]), createRoom21); // User tạo phòng
router.put(
  "/room/:id/approve",
  checkRole21(["Admin", "SuperAdmin"]),
  approveRoom21
); // Admin duyệt phòng

module.exports = router;
