import {
    FaBars,
    FaBell,
    FaSearch,
    FaTimes
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [query, setQuery] = useState("");

    // =========================
    // SEARCH
    // =========================
    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            navigate(`/tickets?search=${query}`);
        }
    };

    const clearSearch = () => {
        setQuery("");
        navigate("/tickets");
    };

    const handleBellClick = () => {
        alert("🔔 Notifications feature coming soon!");
    };

    return (

        <header className="navbar glass">

            {/* ================= LEFT ================= */}
            <div className="navbar-left">

                <button
                    className="menu-btn"
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>

                <h2 className="logo-text">
                    AI Support Assistant
                </h2>

            </div>

            {/* ================= CENTER ================= */}
            <div className="navbar-center">

                <div className="search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />

                    {query && (
                        <FaTimes
                            className="clear-icon"
                            onClick={clearSearch}
                        />
                    )}

                </div>

            </div>

            {/* ================= RIGHT ================= */}
            <div className="navbar-right">

                {/* NOTIFICATIONS */}
                <button
                    className="notification-btn"
                    onClick={handleBellClick}
                >

                    <FaBell />

                    <span className="notification-badge">
                        0
                    </span>

                </button>

                {/* USER */}
                <div
                    className="navbar-user"
                    onClick={() => navigate("/profile")}
                >

                    <div className="navbar-avatar">

                        {user?.fullName
                            ? user.fullName.charAt(0).toUpperCase()
                            : "U"}

                    </div>

                    <div className="user-info">

                        <h4>
                            {user?.fullName || "User"}
                        </h4>

                        <span>
                            {user?.email || "No Email"}
                        </span>

                    </div>

                </div>

            </div>

        </header>
    );
};

export default Navbar;