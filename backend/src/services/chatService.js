const chatModel = require("../models/chatModel");
const ticketModel = require("../models/ticketModel");
const aiService = require("./aiService");

// =======================================
// SEND MESSAGE
// =======================================
const sendMessage = async (
    ticketId,
    userId,
    message
) => {

    // Check ticket exists
    const ticket =
        await ticketModel.getTicketById(
            ticketId
        );

    if (!ticket) {
        throw new Error(
            "Ticket not found."
        );
    }

    // Save user message
    const userMessage =
        await chatModel.saveMessage(
            ticketId,
            userId,
            message,
            "user"
        );

    // Get chat history
    const history =
        await chatModel.getChatHistory(
            ticketId
        );

    // Convert history for AI
    const formattedHistory =
        history.map((chat) => ({
            role:
                chat.sender === "user"
                    ? "user"
                    : "assistant",
            content: chat.message,
        }));

    // Generate AI response
    const aiReply =
        await aiService.generateReply(
            formattedHistory
        );

    // Save AI message
    const aiMessage =
        await chatModel.saveMessage(
            ticketId,
            userId,
            aiReply,
            "ai"
        );

    return {
        userMessage,
        aiMessage,
    };
};

// =======================================
// GET CHAT HISTORY
// =======================================
const getHistory = async (
    ticketId
) => {

    return await chatModel.getChatHistory(
        ticketId
    );

};

// =======================================
// GET LAST MESSAGE
// =======================================
const getLatestMessage = async (
    ticketId
) => {

    return await chatModel.getLatestMessage(
        ticketId
    );

};

// =======================================
// DELETE CHAT
// =======================================
const deleteHistory = async (
    ticketId
) => {

    return await chatModel.deleteChatHistory(
        ticketId
    );

};

// =======================================
// TOTAL MESSAGES
// =======================================
const getMessageCount = async (
    ticketId
) => {

    return await chatModel.getMessageCount(
        ticketId
    );

};

module.exports = {

    sendMessage,
    getHistory,
    getLatestMessage,
    deleteHistory,
    getMessageCount

};