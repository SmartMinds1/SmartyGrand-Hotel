import React, { useState } from "react";
import axios from "axios";
import "../styles/loginSignUp.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: email.trim().toLowerCase(), //sending 'email' key
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="auth-submit-btn">
          Send Reset Link
        </button>
      </form>
      {message && <p className="responseMessage">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
