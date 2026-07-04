import { useNotification } from "../context/NotificationContext";
import "../assets/styles/notifications.css";

const NotificationToast = () => {

    const { notifications } = useNotification();

    return (
        <div className="toast-container">

            {notifications.map(n => (
                <div key={n.id} className={`toast ${n.type}`}>
                    {n.message}
                </div>
            ))}

        </div>
    );
};

export default NotificationToast;