const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create Ticket
router.post(
    "/",
    authMiddleware,
    ticketController.createTicket
);

// Get All Tickets
router.get(
    "/",
    authMiddleware,
    ticketController.getAllTickets
);

// Get My Tickets
router.get(
    "/my",
    authMiddleware,
    ticketController.getMyTickets
);

// Get Ticket By ID
router.get(
    "/:id",
    authMiddleware,
    ticketController.getTicketById
);

// Update Status
router.put(
    "/:id/status",
    authMiddleware,
    ticketController.updateStatus
);

// Update Priority
router.put(
    "/:id/priority",
    authMiddleware,
    ticketController.updatePriority
);

// Delete Ticket
router.delete(
    "/:id",
    authMiddleware,
    ticketController.deleteTicket
);

module.exports = router;