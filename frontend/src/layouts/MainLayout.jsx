import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="layout">

            {/* SIDEBAR */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* MAIN SECTION */}
            <div className="main-content"
                style={{
                    marginLeft: "260px",
                    width: "calc(100% - 260px)"
                }}
            >

                {/* NAVBAR */}
                <Navbar toggleSidebar={toggleSidebar} />


                {/* PAGE CONTENT */}
                <div
                    className="page-content"
                    style={{
                        padding: "15px",
                        minHeight: "calc(100vh - 120px)"
                    }}
                >
                    {children}
                </div>

                {/* FOOTER */}
                <Footer />

            </div>
        </div>
    );
};

export default MainLayout;