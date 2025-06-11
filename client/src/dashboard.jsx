import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./auth";

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Dashboard</h2>
      <button onClick={() => navigate("/tasks")}>Go to Task Board</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
