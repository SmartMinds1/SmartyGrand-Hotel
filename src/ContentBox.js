import React from "react";
/* import PropTypes from "prop-types";  */ //This verifies props passed to a component
import "./ContentBox.css";

//creating the reusable content box
const ContentBox = ({ children, className }) => {
  return <div className={`contentBox ${className || ""}`}>{children}</div>;

  /*   ContentBox.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }; */
};

export default ContentBox;
