import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //The rendering process is only done once
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
