const express = require("express");
const router = express.Router();
const userController = require("../controllers/homeController");

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Home route
 *     responses:
 *       200:
 *         description: Welcome to the homepage
 */
router.get("/", userController.home);

module.exports = router;
