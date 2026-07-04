const chatService = require("../services/chatService");

// ======================================
// SEND MESSAGE
// ======================================
const sendMessage = async (
    req,
    res,
    next
) => {

    try {

        const { message } = req.body;

        const { ticketId } = req.params;

        const result =
            await chatService.sendMessage(
                ticketId,
                req.user.id,
                message
            );

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: result
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// GET CHAT HISTORY
// ======================================
const getHistory = async (
    req,
    res,
    next
) => {

    try {

        const history =
            await chatService.getHistory(
                req.params.ticketId
            );

        return res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// GET LAST MESSAGE
// ======================================
const getLatestMessage = async (
    req,
    res,
    next
) => {

    try {

        const message =
            await chatService.getLatestMessage(
                req.params.ticketId
            );

        return res.status(200).json({
            success: true,
            data: message
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// DELETE CHAT HISTORY
// ======================================
const deleteHistory = async (
    req,
    res,
    next
) => {

    try {

        await chatService.deleteHistory(
            req.params.ticketId
        );

        return res.status(200).json({
            success: true,
            message: "Chat history deleted successfully"
        });

    } catch (error) {

        next(error);

    }

};

// ======================================
// MESSAGE COUNT
// ======================================
const getMessageCount = async (
    req,
    res,
    next
) => {

    try {

        const total =
            await chatService.getMessageCount(
                req.params.ticketId
            );

        return res.status(200).json({
            success: true,
            total
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {

    sendMessage,
    getHistory,
    getLatestMessage,
    deleteHistory,
    getMessageCount

};