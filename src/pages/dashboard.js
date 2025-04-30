// pages/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h2>Welcome back 👋</h2>
        {userData ? (
          <div className="user-info">
            {/* <div>
              <span className="label">Username:</span>
              <span className="value">{userData.username}</span>
            </div> */}
            <div>
              <span className="label">Email:</span>
              <span className="value">{userData.email}</span>
            </div>
            <div>
              <span className="label">Role:</span>
              <span className="value">{userData.role}</span>
            </div>
          </div>
        ) : (
          <p className="loading">Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
