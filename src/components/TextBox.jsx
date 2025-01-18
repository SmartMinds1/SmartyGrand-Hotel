import React from "react";
import "./TextBox.css";

const TextBox = ({className, children}) =>{
    return(
        <div className={`TextBox ${className || ""}`} > {children}</div>
    );
}
export default TextBox;