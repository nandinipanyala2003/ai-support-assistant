const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// =======================================
// SAVE MESSAGE
// =======================================
const saveMessage = async (
    ticketId,
    userId,
    message,
    sender
) => {

    const result = await db.query(
        `
        INSERT INTO chat_history
        (
            id,
            ticket_id,
            user_id,
            message,
            sender
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5
        )
        RETURNING *
        `,
        [
            uuidv4(),
            ticketId,
            userId,
            message,
            sender
        ]
    );

    return result.rows[0];
};

// =======================================
// GET CHAT HISTORY
// =======================================
const getChatHistory = async (
    ticketId
) => {

    const result = await db.query(
        `
        SELECT
            ch.*,
            u.full_name
        FROM chat_history ch
        JOIN users u
            ON ch.user_id = u.id
        WHERE ch.ticket_id = $1
        ORDER BY ch.created_at ASC
        `,
        [ticketId]
    );

    return result.rows;
};

// =======================================
// GET LATEST MESSAGE
// =======================================
const getLatestMessage = async (
    ticketId
) => {

    const result = await db.query(
        `
        SELECT *
        FROM chat_history
        WHERE ticket_id = $1
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [ticketId]
    );

    return result.rows[0];
};

// =======================================
// DELETE CHAT HISTORY
// =======================================
const deleteChatHistory = async (
    ticketId
) => {

    const result = await db.query(
        `
        DELETE FROM chat_history
        WHERE ticket_id = $1
        RETURNING *
        `,
        [ticketId]
    );

    return result.rows;
};

// =======================================
// TOTAL MESSAGE COUNT
// =======================================
const getMessageCount = async (
    ticketId
) => {

    const result = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM chat_history
        WHERE ticket_id = $1
        `,
        [ticketId]
    );

    return parseInt(
        result.rows[0].total
    );
};

module.exports = {
    saveMessage,
    getChatHistory,
    getLatestMessage,
    deleteChatHistory,
    getMessageCount
};