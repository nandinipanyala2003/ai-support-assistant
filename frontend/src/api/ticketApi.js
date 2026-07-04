import api from "./axios";

export const getTickets = () =>
    api.get("/tickets");

export const getMyTickets = () =>
    api.get("/tickets/my");

export const getTicket = (id) =>
    api.get(`/tickets/${id}`);

export const createTicket = (data) =>
    api.post("/tickets", data);

export const updateStatus = (id, status) =>
    api.put(`/tickets/${id}/status`, {
        status
    });

export const updatePriority = (id, priority) =>
    api.put(`/tickets/${id}/priority`, {
        priority
    });

export const deleteTicket = (id) =>
    api.delete(`/tickets/${id}`);