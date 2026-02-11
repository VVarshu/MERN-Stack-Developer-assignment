import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      navigate("/agents");

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Upload & Distribute Tasks</h2>

          <form onSubmit={handleUpload}>
            <label style={styles.uploadBox}>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              {file ? (
                <span style={styles.fileName}>{file.name}</span>
              ) : (
                <span>Click to select CSV / XLSX file</span>
              )}
            </label>

            <button type="submit" style={styles.button}>
              Upload & Distribute
            </button>
          </form>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    width: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "25px",
    fontSize: "22px",
    fontWeight: "600",
  },
  uploadBox: {
    display: "block",
    border: "2px dashed #94a3b8",
    padding: "30px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "20px",
    background: "#f8fafc",
    transition: "0.3s",
  },
  fileName: {
    fontWeight: "500",
    color: "#2563eb",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
};

export default Upload;
