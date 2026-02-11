import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import AddAgent from "./AddAgent";


function AgentsList() {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agents");
      setAgents(res.data);
    } catch (error) {
      console.error("Failed to fetch agents");
    }
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.content}>
        <h2>Agents List</h2>

        <input
          type="text"
          placeholder="Search agent by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.grid}>
          {filteredAgents.map((agent) => (
            <div key={agent._id} style={styles.card}>
              <h3>{agent.name}</h3>
              <p>Email: {agent.email}</p>
              <p>Mobile: {agent.mobile}</p>
              <p>
                Tasks Assigned:{" "}
                <strong>{agent.taskCount || 0}</strong>
              </p>
            </div>
          ))}
        </div>
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
  search: {
    padding: "8px",
    marginBottom: "20px",
    width: "300px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

export default AgentsList;
