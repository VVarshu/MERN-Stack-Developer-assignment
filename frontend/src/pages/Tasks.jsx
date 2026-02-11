import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedAgent, setExpandedAgent] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  // Group tasks by agent
  const groupedTasks = tasks.reduce((acc, task) => {
    const agentId = task.assignedTo?._id;
    if (!agentId) return acc;

    if (!acc[agentId]) {
      acc[agentId] = {
        agentName: task.assignedTo.name,
        tasks: [],
      };
    }

    acc[agentId].tasks.push(task);
    return acc;
  }, {});

  const filteredAgents = Object.entries(groupedTasks).filter(
    ([_, value]) =>
      value.agentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.container}>
        <h2 style={styles.title}>Tasks Distribution</h2>

        <input
          type="text"
          placeholder="Search agent..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.grid}>
          {filteredAgents.map(([agentId, data]) => (
            <div key={agentId} style={styles.card}>
              <div
                style={styles.cardHeader}
                onClick={() =>
                  setExpandedAgent(
                    expandedAgent === agentId ? null : agentId
                  )
                }
              >
                <div>
                  <h3 style={{ margin: 0 }}>{data.agentName}</h3>
                  <p style={styles.taskCount}>
                    {data.tasks.length} Tasks Assigned
                  </p>
                </div>

                <span style={styles.expandIcon}>
                  {expandedAgent === agentId ? "▲" : "▼"}
                </span>
              </div>

              {expandedAgent === agentId && (
                <div style={styles.taskList}>
                  {data.tasks.map((task) => (
                    <div key={task._id} style={styles.taskItem}>
                      <strong>{task.firstName}</strong>
                      <p>{task.phone}</p>
                      <small>{task.notes}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginLeft: "220px",
    padding: "40px",
    width: "100%",
    background: "#f1f5f9",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "600",
  },
  search: {
    padding: "10px 15px",
    marginBottom: "30px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
 card: {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  cursor: "pointer",
  height: "220px",   // fixed height
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
},

taskList: {
  marginTop: "10px",
  overflowY: "auto",
  maxHeight: "220px",  // scroll inside card
  paddingRight: "5px",
},

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskCount: {
    margin: "5px 0 0 0",
    fontSize: "13px",
    color: "#64748b",
  },
  expandIcon: {
    fontSize: "18px",
  },
  
  taskItem: {
    background: "#f8fafc",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};

export default Tasks;
