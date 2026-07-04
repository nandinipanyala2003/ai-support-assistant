const ticketModel = require("../models/ticketModel");

// =======================================
// CREATE TICKET
// =======================================
const createTicket = async (
    userId,
    title,
    description,
    priority = "medium"
) => {

    if (!title || !description) {
        throw new Error(
            "Title and Description are required."
        );
    }

    return await ticketModel.createTicket(
        userId,
        title,
        description,
        priority.toLowerCase()
    );

};

// =======================================
// GET ALL TICKETS
// =======================================
const getAllTickets = async () => {

    return await ticketModel.getAllTickets();

};

// =======================================
// GET USER TICKETS
// =======================================
const getUserTickets = async (userId) => {

    return await ticketModel.getUserTickets(userId);

};

// =======================================
// GET TICKET BY ID
// =======================================
const getTicketById = async (ticketId) => {

    const ticket =
        await ticketModel.getTicketById(ticketId);

    if (!ticket) {

        throw new Error("Ticket not found.");

    }

    return ticket;

};

// =======================================
// UPDATE STATUS
// =======================================
const updateTicketStatus = async (
    ticketId,
    status
) => {

    status = status.toLowerCase();

    const allowedStatus = [
        "open",
        "in_progress",
        "resolved",
        "closed"
    ];

    if (!allowedStatus.includes(status)) {

        throw new Error(
            "Invalid ticket status."
        );

    }

    return await ticketModel.updateTicketStatus(
        ticketId,
        status
    );

};

// =======================================
// UPDATE PRIORITY
// =======================================
const updateTicketPriority = async (
    ticketId,
    priority
) => {

    priority = priority.toLowerCase();

    const allowedPriority = [
        "low",
        "medium",
        "high"
    ];

    if (!allowedPriority.includes(priority)) {

        throw new Error(
            "Invalid priority."
        );

    }

    return await ticketModel.updateTicketPriority(
        ticketId,
        priority
    );

};

// =======================================
// DELETE TICKET
// =======================================
const deleteTicket = async (
    ticketId
) => {

    return await ticketModel.deleteTicket(
        ticketId
    );

};

module.exports = {

    createTicket,
    getAllTickets,
    getUserTickets,
    getTicketById,
    updateTicketStatus,
    updateTicketPriority,
    deleteTicket

};