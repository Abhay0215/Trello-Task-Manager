import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./auth";
import TaskBoard from "./TaskBoard";

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      {/* <h2>Welcome to Dashboard</h2> */}
      <TaskBoard />
      {/* <button onClick={() => navigate("/tasks")}>Go to Task Board</button> */}
      <button className ="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
