import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, logout } from "./auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const[message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:5000/api/protected", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        logout();
        navigate("/");
      });
  }, [navigate]);

  return (
    <div className="Best-container">
      <h1>Welcome to the Dashboard</h1>
      <p>You are successfully signed in.</p>
      <button onClick= {() => { logout(); navigate("/"); }}>Logout</button>
    </div>
  );
}


export default Dashboard;