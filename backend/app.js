require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./src/routes/authRoutes");
const ticketRoutes = require("./src/routes/ticketRoutes");
const chatRoutes = require("./src/routes/chatRoutes");

const errorMiddleware = require("./src/middlewares/errorMiddleware");

const app = express();

// ==========================
// MIDDLEWARES
// ==========================
app.use(cors({
    origin: 
    ["http://localhost:5173",
     "https://your-frontend-url.vercel.app"
],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(morgan("dev"));

// ==========================
// HEALTH CHECK
// ==========================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Support Assistant API Running 🚀"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server Healthy"
    });
});

// ==========================
// ROUTES
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/chat", chatRoutes);

// ==========================
// ERROR MIDDLEWARE
// ==========================
app.use(errorMiddleware);

module.exports = app;