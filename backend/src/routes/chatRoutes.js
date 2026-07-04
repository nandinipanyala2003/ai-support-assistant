const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

// Send Message
router.post(
    "/:ticketId",
    authMiddleware,
    chatController.sendMessage
);

// Chat History
router.get(
    "/:ticketId",
    authMiddleware,
    chatController.getHistory
);

// Latest Message
router.get(
    "/:ticketId/latest",
    authMiddleware,
    chatController.getLatestMessage
);

// Message Count
router.get(
    "/:ticketId/count",
    authMiddleware,
    chatController.getMessageCount
);

// Delete Chat
router.delete(
    "/:ticketId",
    authMiddleware,
    chatController.deleteHistory
);

module.exports = router;