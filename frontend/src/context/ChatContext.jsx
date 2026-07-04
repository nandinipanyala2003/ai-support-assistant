import { createContext, useContext, useState } from "react";
import {
    sendMessage,
    getHistory,
} from "../api/chatApi";

import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // ==========================
    // Load Chat History
    // ==========================
    const loadMessages = async (ticketId) => {

        try {

            setLoading(true);

            const res = await getHistory(ticketId);

            if (res.data.success) {
                setMessages(res.data.data || []);
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to load chat."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Send Message
    // ==========================
    const sendChat = async (ticketId, message) => {

        try {

            const res = await sendMessage(ticketId, message);

            if (res.data.success) {

                setMessages((prev) => [
                    ...prev,
                    res.data.data,
                    
                ]);

            }

            return res.data;

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Message failed."
            );

            throw error;

        }

    };

    // ==========================
    // Clear Chat
    // ==========================
    const clearMessages = () => {
        setMessages([]);
    };

    return (
        <ChatContext.Provider
            value={{
                messages,
                loading,
                sendChat,
                loadMessages,
                clearMessages,
                setMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};

export default ChatContext;