const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

(async () => {
    try {
        const client = await pool.connect();
        console.log("✅ PostgreSQL Connected Successfully");
        client.release();
    } catch (error) {
        console.error("❌ PostgreSQL Connection Error:", error.message);
        process.exit(1);
    }
})();

module.exports = pool;