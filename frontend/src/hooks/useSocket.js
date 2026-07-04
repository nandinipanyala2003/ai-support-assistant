import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNotification } from "../context/NotificationContext";

export const useSocketEvents = () => {

    const { socket } = useSocket();
    const { addNotification } = useNotification();

    useEffect(() => {

        if (!socket) return;

        socket.on("ticket_updated", (data) => {
            addNotification(data.message, "success");
        });

        socket.on("ticket_created", (data) => {
            addNotification(data.message, "info");
        });

        socket.on("ticket_closed", (data) => {
            addNotification("Ticket Closed 🎉", "success");
        });

        return () => {
            socket.off("ticket_updated");
            socket.off("ticket_created");
            socket.off("ticket_closed");
        };

    }, [socket]);
};