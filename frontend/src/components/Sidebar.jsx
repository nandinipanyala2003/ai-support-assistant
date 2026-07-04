import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaTicketAlt,
    FaUserCircle,
    FaSignOutAlt,
    FaHeadset,
    FaTimes
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen
}) => {

    const {
        user,
        logout
    } = useAuth();

    const menuItems = [
        {
            title: "Dashboard",
            icon: <FaHome />,
            path: "/dashboard"
        },
        {
            title: "Tickets",
            icon: <FaTicketAlt />,
            path: "/tickets"
        },
        {
            title: "Profile",
            icon: <FaUserCircle />,
            path: "/profile"
        }
    ];

    return (

        <aside
            className={`sidebar ${sidebarOpen ? "show" : ""}`}
        >

            <button
                className="close-sidebar"
                onClick={() => setSidebarOpen(false)}
            >

                <FaTimes />

            </button>

            <div className="sidebar-top">

                <div className="logo">

                    <FaHeadset size={28} />

                    <div>

                        <h2>

                            AI Support

                        </h2>

                        <span>

                            Assistant

                        </span>

                    </div>

                </div>

            </div>

            <div className="user-box">

                <div className="avatar">

                    {
                        user?.fullName
                            ? user.fullName
                                .charAt(0)
                                .toUpperCase()
                            : "U"
                    }

                </div>

                <h3>

                    {user?.fullName || "User"}

                </h3>

                <p>

                    {user?.email}

                </p>

            </div>

            <nav className="sidebar-menu">

                {
                    menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <span className="sidebar-icon">

                                {item.icon}

                            </span>

                            <span>

                                {item.title}

                            </span>

                        </NavLink>

                    ))
                }

            </nav>

            <div className="sidebar-bottom">

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <FaSignOutAlt />

                    <span>

                        Logout

                    </span>

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;