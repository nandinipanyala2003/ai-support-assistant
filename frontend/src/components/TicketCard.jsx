import { Link } from "react-router-dom";
import API from "../api/axios";

import {
    FaComments,
    FaEdit,
    FaTrash,
    FaExclamationCircle,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";

function TicketCard({ ticket }) {

    // ======================
    // DELETE TICKET
    // ======================
    const deleteTicket = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ticket?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/tickets/${ticket.id}`);

            window.location.reload();

        } catch (err) {

            console.log(err);

        }

    };

    // ======================
    // STATUS ICON
    // ======================
    const getStatusIcon = () => {

        switch (ticket.status) {

            case "Closed":
                return <FaCheckCircle color="green" />;

            case "In Progress":
                return <FaClock color="orange" />;

            default:
                return <FaExclamationCircle color="red" />;
        }

    };

    return (

        <div className="ticket-card">

            {/* HEADER */}
            <div className="ticket-header">

                <h3>{ticket.title}</h3>

                {getStatusIcon()}

            </div>

            {/* DESCRIPTION */}
            <p>{ticket.description}</p>

            {/* DETAILS */}
            <div className="ticket-footer">

                <span>
                    Priority: <b>{ticket.priority}</b>
                </span>

                <span>
                    Status: <b>{ticket.status}</b>
                </span>

            </div>

            {/* ACTION BUTTONS */}
            <div className="ticket-actions">

                <Link
                    to={`/chat/${ticket.id}`}
                    className="chat-btn"
                >

                    <FaComments />
                    Chat AI

                </Link>

                <Link
                    to={`/edit-ticket/${ticket.id}`}
                    className="edit-btn"
                >

                    <FaEdit />
                    Edit

                </Link>

                <button
                    onClick={deleteTicket}
                    className="delete-btn"
                >

                    <FaTrash />
                    Delete

                </button>

            </div>

        </div>

    );

}

export default TicketCard;