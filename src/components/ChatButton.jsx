import React from "react";
import "./ChatButton.css";

const ChatButton = ( {icon, onClick, btnName}) => {
    return(
        <button
        className="chatBtn"
        type="button"
        onClick = {onClick}
        >
        {icon}
        {btnName}
        </button>
    )
}

export default ChatButton;