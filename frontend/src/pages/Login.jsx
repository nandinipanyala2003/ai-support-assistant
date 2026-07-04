import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/login.css";

const Login = () => {

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email.trim()) {
            return alert("Email is required");
        }

        if (!formData.password.trim()) {
            return alert("Password is required");
        }

        try {

            setLoading(true);

            await login(formData);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>
                    AI Support Assistant
                </h1>

                <p>
                    Sign in to continue
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <FaEnvelope />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-group">

                        <FaLock />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Signing In..."
                                : (
                                    <>
                                        <FaSignInAlt />

                                        Login
                                    </>
                                )
                        }

                    </button>

                </form>

                <div className="login-footer">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default Login;