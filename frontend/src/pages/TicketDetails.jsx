import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
    FaArrowLeft,
    FaRobot,
    FaCheckCircle,
    FaExclamationTriangle,
    FaCalendarAlt,
    FaFlag,
    FaTasks,
    FaSyncAlt
} from "react-icons/fa";

import {
    getTicket,
    updateStatus,
    updatePriority
} from "../api/ticketApi";

import "../assets/styles/ticket-details.css";

const TicketDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [updatingPriority, setUpdatingPriority] = useState(false);

    // ==========================
    // LOAD TICKET
    // ==========================
    const loadTicket = async () => {

        try {

            setLoading(true);

            const res = await getTicket(id);

            setTicket(res.data.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load ticket.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTicket();

    }, [id]);

    // ==========================
    // STATUS COLOR
    // ==========================
    const getStatusClass = (status) => {

        switch (status?.toLowerCase()) {

            case "closed":
                return "status closed";

            case "resolved":
                return "status resolved";

            case "in_progress":
                return "status progress";

            default:
                return "status open";

        }

    };

    // ==========================
    // PRIORITY COLOR
    // ==========================
    const getPriorityClass = (priority) => {

        switch (priority?.toLowerCase()) {

            case "high":
                return "priority high";

            case "medium":
                return "priority medium";

            default:
                return "priority low";

        }

    };

    // ==========================
    // UPDATE STATUS
    // ==========================
    const handleStatusChange = async (e) => {

        const newStatus = e.target.value;

        try {

            setUpdatingStatus(true);

            const res = await updateStatus(
                id,
                newStatus
            );

            setTicket(res.data.data);

            toast.success("Ticket status updated successfully.");

        } catch (error) {

            console.log(error);

            toast.error("Unable to update status.");

        } finally {

            setUpdatingStatus(false);

        }

    };

    // ==========================
    // UPDATE PRIORITY
    // ==========================
    const handlePriorityChange = async (e) => {

        const newPriority = e.target.value;

        try {

            setUpdatingPriority(true);

            const res = await updatePriority(
                id,
                newPriority
            );

            setTicket(res.data.data);

            toast.success("Priority updated successfully.");

        } catch (error) {

            console.log(error);

            toast.error("Unable to update priority.");

        } finally {

            setUpdatingPriority(false);

        }

    };

    if (loading) {

        return (

            <div className="ticket-loading">

                <div className="loader"></div>

                <h3>Loading Ticket...</h3>

            </div>

        );

    }

    if (!ticket) {

        return (

            <div className="ticket-loading">

                <h2>Ticket Not Found</h2>

            </div>

        );

    }

    return (

        <div className="ticket-details-page">

            {/* HEADER */}

            <div className="details-top">

                <button
                    className="back-btn"
                    onClick={() => navigate("/tickets")}
                >

                    <FaArrowLeft />

                    Back

                </button>

                <button
                    className="chat-btn"
                    onClick={() => navigate(`/chat/${id}`)}
                >

                    <FaRobot />

                    Open AI Chat

                </button>

            </div>

            {/* MAIN CARD */}

            <div className="ticket-card">

                <div className="ticket-header">

                    <div>

                        <h1>

                            {ticket.title}

                        </h1>

                        <p className="ticket-description">

                            {ticket.description}

                        </p>

                    </div>

                    <div className={getStatusClass(ticket.status)}>

                        {ticket.status.replace("_", " ")}

                    </div>

                </div>

                <div className="ticket-info-grid">
                                        <div className="info-card">

                        <div className="info-icon blue">

                            <FaTasks />

                        </div>

                        <div>

                            <span>Status</span>

                            <select
                                value={ticket.status}
                                disabled={updatingStatus}
                                onChange={handleStatusChange}
                                className="details-select"
                            >

                                <option value="open">
                                    Open
                                </option>

                                <option value="in_progress">
                                    In Progress
                                </option>

                                <option value="resolved">
                                    Resolved
                                </option>

                                <option value="closed">
                                    Closed
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="info-card">

                        <div className="info-icon orange">

                            <FaFlag />

                        </div>

                        <div>

                            <span>Priority</span>

                            <select
                                value={ticket.priority}
                                disabled={updatingPriority}
                                onChange={handlePriorityChange}
                                className="details-select"
                            >

                                <option value="low">
                                    Low
                                </option>

                                <option value="medium">
                                    Medium
                                </option>

                                <option value="high">
                                    High
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="info-card">

                        <div className="info-icon green">

                            <FaCalendarAlt />

                        </div>

                        <div>

                            <span>Created</span>

                            <h4>

                                {
                                    new Date(
                                        ticket.created_at
                                    ).toLocaleString()
                                }

                            </h4>

                        </div>

                    </div>

                    <div className="info-card">

                        <div className="info-icon red">

                            {
                                ticket.status === "closed"

                                    ?

                                    <FaCheckCircle />

                                    :

                                    <FaExclamationTriangle />

                            }

                        </div>

                        <div>

                            <span>Current Status</span>

                            <h4 className={getPriorityClass(ticket.priority)}>

                                {ticket.priority.toUpperCase()}

                            </h4>

                        </div>

                    </div>

                </div>

                <div className="details-actions">

                    <button
                        className="primary-btn"
                        onClick={() =>
                            navigate(`/chat/${ticket.id}`)
                        }
                    >

                        <FaRobot />

                        Continue AI Conversation

                    </button>

                    <button
                        className="secondary-btn"
                        onClick={loadTicket}
                    >

                        <FaSyncAlt />

                        Refresh Ticket

                    </button>

                </div>

            </div>

        </div>

    );

};

export default TicketDetails;