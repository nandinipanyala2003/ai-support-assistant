import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserPlus
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "../assets/styles/register.css";

const Register = () => {

    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.fullName.trim()) {
            return alert("Full Name is required");
        }

        if (!formData.email.trim()) {
            return alert("Email is required");
        }

        if (!formData.password.trim()) {
            return alert("Password is required");
        }

        try {

            setLoading(true);

            await register(formData);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>

                    Create Account

                </h1>

                <p>

                    AI Support Assistant

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <FaUser />

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                    </div>

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
                        className="register-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Creating..."
                                : (
                                    <>
                                        <FaUserPlus />

                                        Register
                                    </>
                                )
                        }

                    </button>

                </form>

                <div className="register-footer">

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default Register;