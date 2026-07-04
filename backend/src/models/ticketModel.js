const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// ===============================
// CREATE TICKET
// ===============================
const createTicket = async (
    userId,
    title,
    description,
    priority = "medium"
) => {

    const result = await db.query(
        `
        INSERT INTO tickets
        (
            id,
            user_id,
            title,
            description,
            status,
            priority
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            'open',
            $5
        )
        RETURNING *
        `,
        [
            uuidv4(),
            userId,
            title,
            description,
            priority
        ]
    );

    return result.rows[0];
};

// ===============================
// GET ALL TICKETS
// ===============================
const getAllTickets = async () => {

    const result = await db.query(
        `
        SELECT
            t.*,
            u.full_name,
            u.email
        FROM tickets t
        JOIN users u
            ON t.user_id = u.id
        ORDER BY t.created_at DESC
        `
    );

    return result.rows;
};

// ===============================
// GET TICKET BY ID
// ===============================
const getTicketById = async (ticketId) => {

    const result = await db.query(
        `
        SELECT
            t.*,
            u.full_name,
            u.email
        FROM tickets t
        JOIN users u
            ON t.user_id = u.id
        WHERE t.id = $1
        LIMIT 1
        `,
        [ticketId]
    );

    return result.rows[0];
};

// ===============================
// GET USER TICKETS
// ===============================
const getUserTickets = async (
    userId
) => {

    const result = await db.query(
        `
        SELECT *
        FROM tickets
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return result.rows;
};

// ===============================
// UPDATE STATUS
// ===============================
const updateTicketStatus = async (
    ticketId,
    status
) => {

    const result = await db.query(
        `
        UPDATE tickets
        SET
            status = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING *
        `,
        [
            status,
            ticketId
        ]
    );

    return result.rows[0];
};

// ===============================
// UPDATE PRIORITY
// ===============================
const updateTicketPriority = async (
    ticketId,
    priority
) => {

    const result = await db.query(
        `
        UPDATE tickets
        SET
            priority = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING *
        `,
        [
            priority,
            ticketId
        ]
    );

    return result.rows[0];
};

// ===============================
// DELETE TICKET
// ===============================
const deleteTicket = async (
    ticketId
) => {

    const result = await db.query(
        `
        DELETE FROM tickets
        WHERE id = $1
        RETURNING *
        `,
        [ticketId]
    );

    return result.rows[0];
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    getUserTickets,
    updateTicketStatus,
    updateTicketPriority,
    deleteTicket
};