import api from "./axios";

// ======================
// GET CHAT HISTORY
// ======================
export const getHistory = (ticketId) => {
    return api.get(`/chat/${ticketId}`);
};

// ======================
// SEND MESSAGE
// ======================
export const sendMessage = (ticketId, data) => {
    return api.post(`/chat/${ticketId}`, data);
};