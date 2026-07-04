const db = require("../config/db");
const { verifyToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
    try {

        // ==========================
        // AUTH HEADER
        // ==========================
        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token Format"
            });
        }

        // ==========================
        // TOKEN
        // ==========================
        const token = authHeader.split(" ")[1];

        console.log("TOKEN:", token);
        console.log("JWT SECRET:", process.env.JWT_SECRET);

        // ==========================
        // VERIFY TOKEN
        // ==========================
        let decoded;

        try {
            decoded = verifyToken(token);
            console.log("DECODED TOKEN:", decoded);
        } catch (err) {
            console.log("JWT VERIFY ERROR:", err.message);

            return res.status(401).json({
                success: false,
                message: "Invalid or Expired Token"
            });
        }

        // ==========================
        // GET USER
        // ==========================
        const result = await db.query(
            `
            SELECT
                id,
                full_name,
                email,
                role
            FROM users
            WHERE id = $1
            `,
            [decoded.id]
        );

        const user = result.rows[0];

        console.log("USER:", user);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.error("AUTH MIDDLEWARE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

module.exports = authMiddleware;