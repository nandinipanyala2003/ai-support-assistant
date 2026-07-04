import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {

    const {
        user,
        loading
    } = useAuth();

    if (loading) {

        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#0f172a",
                    color: "#fff"
                }}
            >
                Loading...
            </div>
        );

    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;

};

export default PrivateRoute;