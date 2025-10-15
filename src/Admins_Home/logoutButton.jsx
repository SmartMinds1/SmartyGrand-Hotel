import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send logout request — backend will clear httpOnly cookies
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true, // ✅ include cookies
        }
      );

      console.log(response.data.message || "Logged out successfully");

      // Remove any locally stored data (optional)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Redirect outside admin page
      navigate("/"); // 👈 redirects to home page
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
