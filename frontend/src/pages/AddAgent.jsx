import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";

function AddAgent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.mobile || !form.password) {
      return "All fields are required";
    }

    if (!form.mobile.startsWith("+")) {
      return "Mobile number must include country code (e.g. +91...)";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await axios.post("/agents/add", form);
      setMessage("Agent created successfully!");

      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });

    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create agent"
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.content}>
        <h2>Add New Agent</h2>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Agent Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Agent Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile (+91...)"
            value={form.mobile}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  content: {
    marginLeft: "220px",
    padding: "40px",
    width: "100%",
    background: "#f1f5f9",
    minHeight: "100vh",
  },
  form: {
    maxWidth: "400px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
};

export default AddAgent;
