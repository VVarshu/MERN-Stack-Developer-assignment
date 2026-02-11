import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      <div>
        <h2 style={styles.logo}>Admin Panel</h2>

        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/add-agent" style={styles.link}>Add Agent</Link>
          <Link to="/agents" style={styles.link}>Agents</Link>
          <Link to="/upload" style={styles.link}>Upload & Distribute</Link>
          <Link to="/tasks" style={styles.link}>Tasks</Link>
        </nav>
      </div>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1e293b",
    color: "#fff",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
  },
  logout: {
    padding: "10px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Sidebar;
