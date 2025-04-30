// pages/OtpVerification.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./OtpVerification.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const fullOtp = otp.join("");
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp: fullOtp,
        }
      );

      alert("OTP verified successfully!");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || "OTP verification failed. Try again."
      );
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-card">
        <div className="otp-left" />
        <div className="otp-right">
          <h2>Verify your email</h2>
          <p className="subtext">Enter the OTP from your registered email id</p>

          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <button onClick={handleVerify}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
