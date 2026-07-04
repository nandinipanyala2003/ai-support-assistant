const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

(async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Neon PostgreSQL Connected Successfully");
        client.release();
    } catch (error) {
        console.error("❌ Neon Connection Error:", error.message);
        process.exit(1);
    }
})();

module.exports = pool;