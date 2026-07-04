import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
    FaPlus,
    FaTrash,
    FaComments,
    FaEye,
    FaFlag,
    FaCheckCircle,
    FaClock
} from "react-icons/fa";

import {
    getMyTickets,
    createTicket,
    updateStatus,
    updatePriority,
    deleteTicket
} from "../api/ticketApi";

import "../assets/styles/global.css";
import "../assets/styles/tickets.css";

const Tickets = () => {

    const [searchParams] = useSearchParams();

    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "low"
    });

    // ===============================
    // LOAD TICKETS
    // ===============================

    const fetchTickets = async () => {

        try {

            setLoading(true);

            const res = await getMyTickets();

            let data = res.data?.data || [];

            if (status) {
                data = data.filter(
                    t =>
                        t.status?.toLowerCase() ===
                        status.toLowerCase()
                );
            }

            if (priority) {
                data = data.filter(
                    t =>
                        t.priority?.toLowerCase() ===
                        priority.toLowerCase()
                );
            }

            if (search) {

                const keyword = search.toLowerCase();

                data = data.filter(ticket =>
                    ticket.title?.toLowerCase().includes(keyword) ||
                    ticket.description?.toLowerCase().includes(keyword) ||
                    ticket.status?.toLowerCase().includes(keyword) ||
                    ticket.priority?.toLowerCase().includes(keyword)
                );

            }

            setTickets(data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTickets();

    }, [status, priority, search]);

    // ===============================
    // CREATE TICKET
    // ===============================

    const handleCreate = async (e) => {

        e.preventDefault();

        try {

            if (
                form.title.trim() === "" ||
                form.description.trim() === ""
            ) {

                alert("Please fill all fields.");

                return;

            }

            await createTicket(form);

            setForm({

                title: "",
                description: "",
                priority: "low"

            });

            fetchTickets();

        } catch (err) {

            console.log(err);

        }

    };

    // ===============================
    // DELETE
    // ===============================

    const handleDelete = async (id) => {

        const ok = window.confirm(
            "Delete this ticket?"
        );

        if (!ok) return;

        try {

            await deleteTicket(id);

            setTickets(prev =>
                prev.filter(ticket => ticket.id !== id)
            );

        } catch (err) {

            console.log(err);

        }

    };

    // ===============================
    // STATUS
    // ===============================

    const handleStatus = async (id, current) => {

        const next =
            current === "open"
                ? "closed"
                : "open";

        await updateStatus(id, next);

        fetchTickets();

    };

    // ===============================
    // PRIORITY
    // ===============================

    const handlePriority = async (id, current) => {

        let next = "low";

        if (current === "low") {

            next = "medium";

        } else if (current === "medium") {

            next = "high";

        }

        await updatePriority(id, next);

        fetchTickets();

    };

    return (

        <div className="tickets-page">

            {/* HEADER */}

            <div className="tickets-header">

                <div>

                    <h1>Support Tickets</h1>

                    <p>

                        Manage, update and track all
                        support requests in one place.

                    </p>

                </div>

                <div className="ticket-counter">

                    {tickets.length} Tickets

                </div>

            </div>

            {/* CREATE FORM */}

            <div className="create-ticket-card">

                <div className="section-title">

                    <FaPlus />

                    <h2>Create New Ticket</h2>

                </div>

                <form
                    className="ticket-form"
                    onSubmit={handleCreate}
                >

                    <input
                        type="text"
                        placeholder="Ticket Title"
                        value={form.title}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                title:e.target.value
                            })
                        }
                    />

                    <textarea
                        rows="5"
                        placeholder="Describe your issue..."
                        value={form.description}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                description:e.target.value
                            })
                        }
                    />

                    <div className="ticket-form-bottom">

                        <select
                            value={form.priority}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    priority:e.target.value
                                })
                            }
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

                        <button
                            type="submit"
                            className="create-ticket-btn"
                        >

                            <FaPlus />

                            Create Ticket

                        </button>

                    </div>

                </form>

            </div>

                        {/* =========================
                TICKET LIST
            ========================== */}

            <div className="tickets-grid">

                {loading ? (

                    <div className="loading-box">

                        Loading Tickets...

                    </div>

                ) : tickets.length === 0 ? (

                    <div className="empty-ticket">

                        <h2>📭 No Tickets Found</h2>

                        <p>
                            Create your first support ticket to get started.
                        </p>

                    </div>

                ) : (

                    tickets.map((ticket) => (

                        <div
                            key={ticket.id}
                            className="ticket-card"
                        >

                            {/* HEADER */}

                            <div className="ticket-card-header">

                                <h2>

                                    {ticket.title}

                                </h2>

                                <span
                                    className={`status-badge ${ticket.status?.toLowerCase()}`}
                                >

                                    {
                                        ticket.status
                                    }

                                </span>

                            </div>

                            {/* DESCRIPTION */}

                            <p className="ticket-description">

                                {ticket.description}

                            </p>

                            {/* DETAILS */}

                            <div className="ticket-meta">

                                <div>

                                    <FaFlag />

                                    <span>

                                        Priority :

                                        <b>

                                            {" "}
                                            {ticket.priority}

                                        </b>

                                    </span>

                                </div>

                                <div>

                                    {
                                        ticket.status === "closed"

                                            ? <FaCheckCircle />

                                            : <FaClock />

                                    }

                                    <span>

                                        {ticket.status}

                                    </span>

                                </div>

                            </div>

                            {/* DATE */}

                            <div className="ticket-date">

                                Created :

                                {

                                    new Date(
                                        ticket.created_at
                                    ).toLocaleDateString()

                                }

                            </div>

                            {/* ACTIONS */}

                            <div className="ticket-actions">

                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        handleStatus(
                                            ticket.id,
                                            ticket.status
                                        )
                                    }
                                >

                                    Toggle Status

                                </button>

                                <button
                                    className="action-btn secondary"
                                    onClick={() =>
                                        handlePriority(
                                            ticket.id,
                                            ticket.priority
                                        )
                                    }
                                >

                                    Toggle Priority

                                </button>

                                <Link
                                    to={`/tickets/${ticket.id}`}
                                    className="action-btn info"
                                >

                                    <FaEye />

                                    View

                                </Link>

                                <Link
                                    to={`/chat/${ticket.id}`}
                                    className="action-btn ai"
                                >

                                    <FaComments />

                                    AI Chat

                                </Link>

                                <button
                                    className="action-btn danger"
                                    onClick={() =>
                                        handleDelete(
                                            ticket.id
                                        )
                                    }
                                >

                                    <FaTrash />

                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

};

export default Tickets;