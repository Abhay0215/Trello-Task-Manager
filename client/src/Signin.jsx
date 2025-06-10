import React, { useState } from "react";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Add your authentication logic here
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
        <p className="register-text">
          Don't have an account? <span className="register-link">Register</span>
        </p>
      </form>
    </div>
  );
}

export default Signin;
