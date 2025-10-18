import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./globalStyles.css";
import App from "./App";
import axios from "axios";

// Ensure cookies are always sent
axios.defaults.withCredentials = true;

//Set your backend base URL globally
axios.defaults.baseURL = "http://localhost:5000";

// This is the resize observer
if (process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("ResizeObserver loop completed")
    ) {
      return; // suppress the warning
    }
    originalError(...args); // show other errors
  };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //The rendering process is only done once
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
