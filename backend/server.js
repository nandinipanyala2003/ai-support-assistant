require("dotenv").config();

console.log("AI_PROVIDER =", process.env.AI_PROVIDER);
console.log("GEMINI =", process.env.GEMINI_API_KEY ? "YES" : "NO");
console.log("OPENAI =", process.env.OPENAI_API_KEY ? "YES" : "NO");

require("./src/config/db");

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

const server = http.createServer(app);

// ==========================
// SOCKET.IO
// ==========================
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"]
    },
    transports: ["websocket", "polling"]
});

app.set("io", io);

io.on("connection", (socket) => {

    console.log("🟢 Socket Connected:", socket.id);

    socket.on("join_ticket", (ticketId) => {

        socket.join(ticketId);

        console.log("📂 Joined Ticket:", ticketId);

    });

    socket.on("send_message", (data) => {

        io.to(data.ticketId).emit("receive_message", data);

    });

    socket.on("disconnect", () => {

        console.log("🔴 Socket Disconnected:", socket.id);

    });

});

// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});