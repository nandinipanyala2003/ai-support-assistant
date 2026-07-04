import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMyTickets } from "../api/ticketApi";

import {
    FaTicketAlt,
    FaCheckCircle,
    FaClock,
    FaExclamationCircle
} from "react-icons/fa";

import "../assets/styles/dashboard.css";

const Dashboard = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        closed: 0,
        high: 0
    });

    // ================= FETCH =================
    const fetchTickets = async () => {
        try {
            setLoading(true);

            const res = await getMyTickets();
            let data = res.data?.data || [];

            // SEARCH FILTER
            if (search.trim() !== "") {
                data = data.filter(t =>
                    t.title?.toLowerCase().includes(search.toLowerCase())
                );
            }

            setTickets(data);

            // STATS
            setStats({
                total: data.length,
                open: data.filter(t => t.status?.toLowerCase() === "open").length,
                closed: data.filter(t => t.status?.toLowerCase() === "closed").length,
                high: data.filter(t => t.priority?.toLowerCase() === "high").length
            });

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [search]);

    // ================= UI =================
    return (

        <div className="dashboard">

            {/* HERO SECTION */}
            <div className="dashboard-hero">

                <div>
                    <h1>
                        Welcome back, {user?.fullName || "User"} 👋
                    </h1>
                    <p>Manage your tickets & AI support in one place</p>
                </div>

                <div className="hero-avatar">
                    {user?.fullName?.charAt(0) || "U"}
                </div>

            </div>

            {/* STATS */}
            <div className="dashboard-grid">

                <div className="stat-card" onClick={() => navigate("/tickets")}>
                    <FaTicketAlt />
                    <h3>{stats.total}</h3>
                    <p>Total Tickets</p>
                </div>

                <div className="stat-card open" onClick={() => navigate("/tickets?status=open")}>
                    <FaClock />
                    <h3>{stats.open}</h3>
                    <p>Open</p>
                </div>

                <div className="stat-card closed" onClick={() => navigate("/tickets?status=closed")}>
                    <FaCheckCircle />
                    <h3>{stats.closed}</h3>
                    <p>Closed</p>
                </div>

                <div className="stat-card high" onClick={() => navigate("/tickets?priority=high")}>
                    <FaExclamationCircle />
                    <h3>{stats.high}</h3>
                    <p>High Priority</p>
                </div>

            </div>

            {/* CONTENT */}
            <div className="dashboard-content">

                {/* RECENT */}
                <div className="dashboard-box">

                    <h2>Recent Tickets</h2>

                    {loading ? (
                        <p className="muted">Loading...</p>
                    ) : tickets.length === 0 ? (
                        <p className="muted">No tickets found</p>
                    ) : (

                        tickets.slice(0, 5).map(ticket => (

                            <div
                                key={ticket.id}
                                className="ticket-row"
                                onClick={() => navigate(`/tickets/${ticket.id}`)}
                            >

                                <div>
                                    <h4>{ticket.title}</h4>
                                    <p>{ticket.status} • {ticket.priority}</p>
                                </div>

                                <span className={`badge ${ticket.status}`}>
                                    {ticket.status}
                                </span>

                            </div>

                        ))
                    )}

                </div>

                {/* AI BOX */}
                <div className="dashboard-box ai-box">

                    <h2>AI Assistant 🤖</h2>

                    <p>
                        Ask AI to solve your tickets, errors, or bugs instantly.
                    </p>

                    <button
                        onClick={() => {
                            if (!tickets.length) return alert("Create ticket first");
                            navigate(`/chat/${tickets[0].id}`);
                        }}
                        className="ai-btn"
                    >
                        Start Chat
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;