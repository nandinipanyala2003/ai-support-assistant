import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const ChatBox = ({ ticketId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // =====================
  // GET TOKEN FROM LOCALSTORAGE
  // =====================
  const token = localStorage.getItem("token");

  // =====================
  // JOIN SOCKET ROOM
  // =====================
  useEffect(() => {
    if (!ticketId) return;

    socket.emit("join_ticket", ticketId);

    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data.userMessage, data.aiMessage]);
    };

    socket.on("new_message", handleMessage);

    return () => {
      socket.off("new_message", handleMessage);
    };
  }, [ticketId]);

  // =====================
  // LOAD HISTORY
  // =====================
  const loadHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data.history || []);
    } catch (error) {
      console.log("History error:", error.message);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [ticketId]);

  // =====================
  // SEND MESSAGE
  // =====================
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(
        `http://localhost:5000/api/chat/${ticketId}`,
        { message: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
    } catch (error) {
      console.log("Send message error:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Chat</h2>

      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}:</b> {msg.message}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;