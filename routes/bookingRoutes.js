const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

/**
 * @swagger
 * /bookings/{userId}:
 *   get:
 *     summary: Get bookings by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of bookings
 */
router.get("/:userId", bookingController.getBookingsByUserId);

/**
 * @swagger
 * /bookings/{userId}/{bookingId}:
 *   get:
 *     summary: Get a booking by user ID and booking ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: The ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 */
router.get("/:userId/:bookingId", bookingController.getBookingById);

module.exports = router;
