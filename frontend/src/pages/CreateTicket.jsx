import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import toast from "react-hot-toast";

import "../styles/createTicket.css";

function CreateTicket() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        title: "",

        description: "",

        priority: "Medium",

        category: "General"

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await API.post("/tickets", form);

            toast.success("Ticket Created Successfully");

            navigate("/tickets");

        } catch (err) {

            console.log(err);

            toast.error(

                err.response?.data?.message ||

                "Failed to create ticket"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Navbar />

                <div className="create-ticket-container">

                    <div className="create-ticket-card">

                        <h1>Create Support Ticket</h1>

                        <p>
                            Fill the details below to create a new support ticket.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <label>
                                Ticket Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter Ticket Title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />

                            <label>
                                Description
                            </label>

                            <textarea
                                rows="6"
                                name="description"
                                placeholder="Describe your issue..."
                                value={form.description}
                                onChange={handleChange}
                                required
                            />

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >

                                <option>General</option>

                                <option>Technical</option>

                                <option>Billing</option>

                                <option>Bug</option>

                                <option>Feature Request</option>

                            </select>

                            <label>
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                            >

                                <option>Low</option>

                                <option>Medium</option>

                                <option>High</option>

                                <option>Critical</option>

                            </select>

                            <button
                                type="submit"
                                disabled={loading}
                            >

                                {

                                    loading

                                    ?

                                    "Creating..."

                                    :

                                    "Create Ticket"

                                }

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CreateTicket;