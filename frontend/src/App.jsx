import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";

import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketDetails from "./pages/TicketDetails";
import AIChat from "./pages/AIChat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";

function App() {

    return (

        <Routes>

            {/* =========================
                PUBLIC ROUTES
            ========================= */}

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* =========================
                PROTECTED ROUTES
            ========================= */}

            <Route element={<PrivateRoute />}>

                <Route
                    path="/dashboard"
                    element={
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    }
                />

                <Route
                    path="/tickets"
                    element={
                        <MainLayout>
                            <Tickets />
                        </MainLayout>
                    }
                />

                <Route
                    path="/tickets/:id"
                    element={
                        <MainLayout>
                            <TicketDetails />
                        </MainLayout>
                    }
                />

                <Route
                    path="/chat/:ticketId"
                    element={
                        <MainLayout>
                            <Chat />
                        </MainLayout>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    }
                />

            </Route>

            {/* =========================
                404 PAGE
            ========================= */}

            <Route path="*" element={<NotFound />} />

        </Routes>

    );

}

export default App;