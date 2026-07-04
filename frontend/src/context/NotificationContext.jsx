import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = "info") => {

        const newNotif = {
            id: Date.now(),
            message,
            type
        };

        setNotifications(prev => [newNotif, ...prev]);

        setTimeout(() => {
            setNotifications(prev =>
                prev.filter(n => n.id !== newNotif.id)
            );
        }, 4000);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            addNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);