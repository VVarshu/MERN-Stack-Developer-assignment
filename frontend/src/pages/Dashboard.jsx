import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const agentsRes = await axios.get("/agents");
      const tasksRes = await axios.get("/tasks");

      setAgents(agentsRes.data);
      setTasks(tasksRes.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  const totalAgents = agents.length;
  const totalTasks = tasks.length;
  const activeAgents = agents.filter(a => a.taskCount > 0).length;
  const pendingTasks = tasks.length; // since no status field yet

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>
            Manage agents and distribute tasks efficiently.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Total Agents</h3>
            <p style={styles.number}>{totalAgents}</p>
          </div>

          <div style={styles.card}>
            <h3>Total Tasks</h3>
            <p style={styles.number}>{totalTasks}</p>
          </div>

          <div style={styles.card}>
            <h3>Active Agents</h3>
            <p style={styles.number}>{activeAgents}</p>
          </div>

          <div style={styles.card}>
            <h3>Pending Tasks</h3>
            <p style={styles.number}>{pendingTasks}</p>
          </div>
        </div>

        <div style={styles.infoCard}>
          <h2>Quick Overview</h2>
          <p>
            The system distributes tasks equally among all available agents.
            Upload a new CSV file to automatically assign tasks.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginLeft: "220px",
    padding: "40px",
    width: "100%",
    background: "#f1f5f9",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#64748b",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },
  number: {
    fontSize: "28px",
    fontWeight: "600",
    marginTop: "10px",
    color: "#2563eb",
  },
  infoCard: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },
};

export default Dashboard;
