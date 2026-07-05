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

// =====================================
// CORS
// =====================================

const allowedOrigins = [
    "http://localhost:5173",

    "https://ai-support-assistant-is6k.vercel.app",

    "https://ai-support-assistant-py9mtj26p-nandini-panyalas-projects.vercel.app"
];

app.use(
    cors({
        origin(origin, callback) {

            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("Blocked Origin :", origin);

            return callback(
                new Error("Origin Not Allowed")
            );
        },

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

// =====================================
// BODY PARSER
// =====================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// =====================================
// SECURITY
// =====================================

app.use(helmet());

app.use(morgan("dev"));

// =====================================
// ROOT
// =====================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "🚀 AI Support Assistant Backend Running"

    });

});

app.get("/api/health", (req, res) => {

    res.json({

        success: true,

        message: "Backend Healthy"

    });

});

// =====================================
// ROUTES
// =====================================

app.use("/api/auth", authRoutes);

app.use("/api/tickets", ticketRoutes);

app.use("/api/chat", chatRoutes);

// =====================================
// ERROR
// =====================================

app.use(errorMiddleware);

module.exports = app;