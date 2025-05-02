import React from "react";
import "./Alert.css";

const Alert = ({children, onClose})=>{

    return(
        <div className="alert">
           <div>
           {children}
           </div>
            <button className="okBtn" onClick={onClose} >OK</button>
        </div>
    );
}
export default Alert