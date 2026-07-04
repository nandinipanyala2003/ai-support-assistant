import { useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaUserShield,
    FaSignOutAlt,
    FaArrowLeft,
    FaUserCircle
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import "../assets/styles/profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const firstLetter =
        user?.fullName?.charAt(0).toUpperCase() || "U";

    const joinedDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        )
        : "Recently Joined";

    return (

        <div className="profile-page">

            {/* ===========================
                    TOP BAR
            =========================== */}

            <div className="profile-topbar">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                    Back
                </button>

            </div>

            {/* ===========================
                    PROFILE CARD
            =========================== */}

            <div className="profile-card">

                {/* COVER */}

                <div className="profile-cover">

                    <div className="profile-avatar">

                        {firstLetter}

                    </div>

                </div>

                {/* BODY */}

                <div className="profile-content">

                    <h1>

                        {user?.fullName || "User"}

                    </h1>

                    <p className="profile-role">

                        AI Support Assistant User

                    </p>

                    <div className="profile-badges">

                        <span>
                            Full Stack Project
                        </span>

                        <span>
                            AI Powered
                        </span>

                        <span>
                            Verified User
                        </span>

                    </div>

                    {/* INFO */}

                    <div className="profile-grid">

                        <div className="info-card">

                            <div className="info-icon">

                                <FaUserCircle />

                            </div>

                            <div>

                                <h5>
                                    Full Name
                                </h5>

                                <h3>
                                    {user?.fullName || "-"}
                                </h3>

                            </div>

                        </div>

                        <div className="info-card">

                            <div className="info-icon">

                                <FaEnvelope />

                            </div>

                            <div>

                                <h5>
                                    Email Address
                                </h5>

                                <h3>
                                    {user?.email || "-"}
                                </h3>

                            </div>

                        </div>

                        <div className="info-card">

                            <div className="info-icon">

                                <FaUserShield />

                            </div>

                            <div>

                                <h5>
                                    Account Role
                                </h5>

                                <h3>
                                    User
                                </h3>

                            </div>

                        </div>

                        <div className="info-card">

                            <div className="info-icon">

                                📅

                            </div>

                            <div>

                                <h5>
                                    Member Since
                                </h5>

                                <h3>

                                    {joinedDate}

                                </h3>

                            </div>

                        </div>

                    </div>

                    {/* ABOUT */}

                    <div className="about-card">

                        <h2>

                            About

                        </h2>

                        <p>

                            Welcome to the AI Support Assistant platform.
                            This dashboard helps you create support tickets,
                            manage priorities, chat with AI, track progress,
                            and resolve issues efficiently through an
                            intelligent ticket management system.

                        </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="profile-actions">

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/tickets")}
                        >

                            View My Tickets

                        </button>

                        <button
                            className="danger-btn"
                            onClick={logout}
                        >

                            <FaSignOutAlt />

                            Logout

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Profile;