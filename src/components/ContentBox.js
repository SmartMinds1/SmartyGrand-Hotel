import React from "react";
import "./ContentBox.css";

//creating the reusable content box
const ContentBox = ({ children, className }) => {
  return <div className={`contentBox ${className || ""}`}>{children}</div>;
};

export default ContentBox;
