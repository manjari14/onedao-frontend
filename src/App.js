// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import OtpVerification from "./pages/OtpVerification";

import "./App.css";

function App() {
  const token = localStorage.getItem("token"); // or sessionStorage

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/login" replace /> : <Signup />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/otp" element={<OtpVerification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
