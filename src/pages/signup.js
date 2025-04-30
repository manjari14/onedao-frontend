// pages/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        username,
        role: "user",
      });
      navigate("/otp", { state: { email } });
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-left" />
        <div className="signup-right">
          <h2>Register to Admin Panel</h2>
          <p className="subtext">Enter your phone number and password below</p>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSignup}>
            <label>Email ID</label>
            <input
              type="email"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Enter your confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
