import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";
import { getHistory, sendMessage } from "../api/chatApi";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";

import "../assets/styles/chat.css";

// ===============================
// SOCKET CONNECTION
// ===============================
// const socket = io(import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000");

const AIChat = () => {

    const { ticketId } = useParams();
    const { user } = useAuth();
    const { socket } = useSocket();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    const chatRef = useRef(null);

    // ===============================
    // LOAD CHAT HISTORY
    // ===============================
    const loadHistory = async () => {

        try {

            setLoading(true);

            const res = await getHistory(ticketId);

            setMessages(res.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        loadHistory();
    }, [ticketId]);

    // ===============================
    // SOCKET LISTENER
    // ===============================
    useEffect(() => {
        if (!socket) return;

        socket.on("receive_message", (msg) => {

            if (msg.ticketId === ticketId) {

                setMessages((prev) => [...prev, msg]);

            }

        });

        return () => {
            socket.off("receive_message");
        };

    }, [socket, ticketId]);

    // ===============================
    // AUTO SCROLL
    // ===============================
    useEffect(() => {

        chatRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    // ===============================
    // SEND MESSAGE
    // ===============================
    const handleSend = async () => {

        if (!text.trim()) return;

        const messageData = {
            ticketId,
            sender: user.id,
            message: text
        };

        try {

            // 1. send to backend
            const res = await sendMessage(ticketId, {
                message: text
            });

            // 2. update UI immediately
            setMessages((prev) => [
                ...prev,
                res.data.data.userMessage,
                res.data.data.aiMessage
            ]);

            // 3. emit socket event
            socket.emit("send_message", {
                ticketId,
                ...res.data.data.userMessage
            });

            setText("");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="chat-page">

            {/* ================= CHAT BOX ================= */}

            <div className="chat-box">

                {
                    loading ? (

                        <p className="chat-loading">

                            Loading chat...

                        </p>

                    ) : (

                    messages.map((msg, index) => {

                        console.log("MSG =>", msg);

                        return (
                            <div
                                key={index}
                                className={`chat-message ${
                                    msg.sender === user.id ? "user" : "ai"
                                }`}
                            >
                                <div className="bubble">
                                    {typeof msg.message === "object"
                                        ? JSON.stringify(msg.message)
                                        : msg.message}
                                </div>
                            </div>
                        );

                    })


                    )
                }

                <div ref={chatRef}></div>

            </div>

            {/* ================= INPUT BOX ================= */}

            <div className="chat-input">

                <input
                    type="text"
                    placeholder="Type your message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                />

                <button onClick={handleSend}>

                    <FaPaperPlane />

                </button>

            </div>

        </div>

    );

};

export default AIChat;