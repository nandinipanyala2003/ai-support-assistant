const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// ===============================
// CREATE USER
// ===============================
const createUser = async (
    fullName,
    email,
    passwordHash,
    role = "user"
) => {

    const result = await db.query(
        `
        INSERT INTO users
        (
            id,
            full_name,
            email,
            password_hash,
            role
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5
        )
        RETURNING
            id,
            full_name AS "fullName",
            email,
            role,
            created_at,
            updated_at
        `,
        [
            uuidv4(),
            fullName,
            email,
            passwordHash,
            role
        ]
    );

    return result.rows[0];
};

// ===============================
// FIND USER BY EMAIL
// ===============================
const findUserByEmail = async (email) => {

    const result = await db.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        LIMIT 1
        `,
        [email]
    );

    return result.rows[0];
};

// ===============================
// FIND USER BY ID
// ===============================
const findUserById = async (id) => {

    const result = await db.query(
        `
        SELECT
            id,
            full_name AS "fullName",
            email,
            role,
            created_at,
            updated_at
        FROM users
        WHERE id = $1
        LIMIT 1
        `,
        [id]
    );

    return result.rows[0];
};

// ===============================
// GET ALL USERS
// ===============================
const getAllUsers = async () => {

    const result = await db.query(
        `
        SELECT
            id,
            full_name AS "fullName",
            email,
            role,
            created_at
        FROM users
        ORDER BY created_at DESC
        `
    );

    return result.rows;
};

// ===============================
// UPDATE USER ROLE
// ===============================
const updateUserRole = async (
    id,
    role
) => {

    const result = await db.query(
        `
        UPDATE users
        SET
            role = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING
            id,
            full_name AS "fullName",
            email,
            role,
            updated_at
        `,
        [
            role,
            id
        ]
    );

    return result.rows[0];
};

// ===============================
// DELETE USER
// ===============================
const deleteUser = async (id) => {

    const result = await db.query(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    getAllUsers,
    updateUserRole,
    deleteUser
};