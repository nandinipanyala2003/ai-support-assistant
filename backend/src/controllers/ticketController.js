const ticketService = require("../services/ticketService");

// ======================================
// CREATE TICKET
// ======================================
const createTicket = async (
    req,
    res,
    next
) => {

    try {

        const {
            title,
            description,
            priority
        } = req.body;

        const ticket =
            await ticketService.createTicket(
                req.user.id,
                title,
                description,
                priority
            );

        return res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            data: ticket
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// GET ALL TICKETS
// ======================================
const getAllTickets = async (
    req,
    res,
    next
) => {

    try {

        const tickets =
            await ticketService.getAllTickets();

        return res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// GET MY TICKETS
// ======================================
const getMyTickets = async (
    req,
    res,
    next
) => {

    try {

        const tickets =
            await ticketService.getUserTickets(
                req.user.id
            );

        return res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// GET TICKET BY ID
// ======================================
const getTicketById = async (
    req,
    res,
    next
) => {

    try {

        const ticket =
            await ticketService.getTicketById(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data: ticket
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// UPDATE STATUS
// ======================================
const updateStatus = async (
    req,
    res,
    next
) => {

    try {

        const ticket =
            await ticketService.updateTicketStatus(
                req.params.id,
                req.body.status
            );

        return res.status(200).json({
            success: true,
            message: "Ticket status updated",
            data: ticket
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// UPDATE PRIORITY
// ======================================
const updatePriority = async (
    req,
    res,
    next
) => {

    try {

        const ticket =
            await ticketService.updateTicketPriority(
                req.params.id,
                req.body.priority
            );

        return res.status(200).json({
            success: true,
            message: "Ticket priority updated",
            data: ticket
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// DELETE TICKET
// ======================================
const deleteTicket = async (
    req,
    res,
    next
) => {

    try {

        await ticketService.deleteTicket(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Ticket deleted successfully"
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {

    createTicket,
    getAllTickets,
    getMyTickets,
    getTicketById,
    updateStatus,
    updatePriority,
    deleteTicket

};