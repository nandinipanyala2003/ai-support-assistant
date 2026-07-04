import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NotificationToast from "./components/NotificationToast";
import { NotificationProvider } from "./context/NotificationContext";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

// OPTIONAL SAFETY (only if you created them)
// If you DON'T have these contexts, comment them
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/ChatContext";

/* CSS */
import "./assets/styles/variables.css";
import "./assets/styles/global.css";
import "./assets/styles/sidebar.css";
import "./assets/styles/navbar.css";
import "./assets/styles/dashboard.css";
import "./assets/styles/chat.css";
import "./assets/styles/login.css";
import "./assets/styles/register.css";
import "./assets/styles/animations.css";
import "./assets/styles/scrollbar.css";
import "./assets/styles/profile.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <NotificationProvider>
                <AuthProvider>

                    {/* SOCKET CONTEXT */}
                    <SocketProvider>

                        {/* CHAT CONTEXT */}
                        <ChatProvider>

                            {/* TOAST SYSTEM */}
                            <Toaster
                                position="top-right"
                                reverseOrder={false}
                                toastOptions={{
                                    duration: 3000,
                                    style: {
                                        background: "#0f172a",
                                        color: "#fff",
                                        border: "1px solid #334155"
                                    }
                                }}
                            />

                            <App />

                        </ChatProvider>

                    </SocketProvider>

                </AuthProvider>
            </NotificationProvider>

        </BrowserRouter>
    </React.StrictMode>
);