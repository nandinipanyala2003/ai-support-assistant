const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// ======================
// AUTH ROUTES
// ======================

// Register user
router.post("/register", authController.register);

// Login user
router.post("/login", authController.login);

// Get logged-in user profile
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;