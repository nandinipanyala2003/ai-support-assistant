import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

function EditTicket() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "",
        status: ""
    });

    useEffect(() => {
        loadTicket();
    }, []);

    const loadTicket = async () => {
        try {
            const res = await API.get(`/tickets/${id}`);
            setForm(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.put(`/tickets/${id}`, form);

            toast.success("Ticket Updated");

            navigate("/tickets");

        } catch (err) {
            toast.error("Update Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-main">
                <Navbar />

                <div style={{ padding: "30px" }}>
                    <h2>Edit Ticket</h2>

                    <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />

                        <select name="priority" value={form.priority} onChange={handleChange}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>

                        <select name="status" value={form.status} onChange={handleChange}>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Closed</option>
                        </select>

                        <button disabled={loading}>
                            {loading ? "Updating..." : "Update Ticket"}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default EditTicket;