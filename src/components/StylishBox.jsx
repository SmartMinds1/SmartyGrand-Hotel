import React from "react";
import "./StylishBox.css";

const StylishBox = ({className, children}) =>{
    return(
        <div className={`stylishTextBox ${className || ""}`} > {children}</div>
    );
}
export default StylishBox;