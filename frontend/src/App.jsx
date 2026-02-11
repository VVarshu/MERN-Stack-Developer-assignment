import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddAgent from "./pages/AddAgent";
import Upload from "./pages/Upload";
import AgentsList from "./pages/AgentsList";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
        />

        <Route
          path="/add-agent"
          element={
            <ProtectedRoute>
              <AddAgent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agents"
          element={
            <ProtectedRoute>
              <AgentsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
