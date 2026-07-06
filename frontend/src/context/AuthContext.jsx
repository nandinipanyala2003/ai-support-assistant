import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ==========================
    // LOGIN
    // ==========================
    const login = async (data) => {

        try {

            const res = await api.post("/auth/login", data);

            console.log("LOGIN RESPONSE:", res.data);

            localStorage.setItem("token", res.data.token);

            setUser(res.data.user);

            console.log("LOGIN USER:", res.data.user);

            // Small delay to allow React state update
            setTimeout(() => {
                navigate("/dashboard");
            }, 100);

        } catch (error) {

            console.log(
                "LOGIN ERROR:",
                error.response?.data || error.message
            );

            throw error;

        }

    };

    // ==========================
    // REGISTER
    // ==========================
    const register = async (data) => {

        try {

            const res = await api.post("/auth/register", data);

            console.log("REGISTER RESPONSE:", res.data);

            localStorage.setItem("token", res.data.token);

            setUser(res.data.user);

            setTimeout(() => {
                navigate("/dashboard");
            }, 100);

        } catch (error) {

            console.log(
                "REGISTER ERROR:",
                error.response?.data || error.message
            );

            throw error;

        }

    };

    // ==========================
    // LOAD USER
    // ==========================
    const loadUser = async () => {

        try {

            const token = localStorage.getItem("token");

            console.log("TOKEN:", token);

            if (!token) {

                setUser(null);
                setLoading(false);
                return;

            }

            const res = await api.get("/auth/profile");

            console.log(res.data);

            console.log("PROFILE RESPONSE:", res.data);

            console.log("PROFILE USER:", res.data.user);

            setUser(res.data.user);

        } catch (error) {

            console.log(
                "PROFILE ERROR:",
                error.response?.data || error.message
            );

            localStorage.removeItem("token");

            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // LOGOUT
    // ==========================
    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

        navigate("/login");

    };

    useEffect(() => {

        loadUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);