import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        // Login ayyaka matrame socket connect
        if (!token) return;

        const socketInstance = io(import.meta.env.VITE_SOCKET_URL, {

            transports: ["websocket", "polling"],

            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,

            autoConnect: true

        });

        socketInstance.on("connect", () => {

            console.log("🟢 Socket Connected:", socketInstance.id);

        });

        socketInstance.on("disconnect", (reason) => {

            console.log("🔴 Socket Disconnected:", reason);

        });

        socketInstance.on("connect_error", (err) => {

            console.error("❌ Socket Error:", err.message);

        });

        setSocket(socketInstance);

        return () => {

            socketInstance.removeAllListeners();

            socketInstance.disconnect();

        };

    }, []);

    return (

        <SocketContext.Provider value={{ socket }}>

            {children}

        </SocketContext.Provider>

    );

};

export const useSocket = () => useContext(SocketContext);