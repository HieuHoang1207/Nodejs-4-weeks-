const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/:userId", bookingController.getBookingsByUserId);
router.get("/:userId/:bookingId", bookingController.getBookingById);

module.exports = router;
