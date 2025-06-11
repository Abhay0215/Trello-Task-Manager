import React, { useState } from "react";
import "./Signin.css";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:5000/api/auth/signin", { email,password});

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard");
    } catch (err) {
        alert("Invalid creds");
    }
    
  };

  return (
    <div className="signin-container">
      <form className="signin-card" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {/* Optional future Register link */}
        <Link to ="/register">
        <p className="register-text">
          Don't have an account? <span className="register-link">Register</span>
        </p> </Link>
      </form>
    </div>
  );
}

export default Signin;
