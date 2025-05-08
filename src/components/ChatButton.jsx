import React from "react";
import "./ChatButton.css";

const ChatButton = ( { onClick, btnName}) => {
    return(
        <button
        className="chatBtn"
        type="button"
        onClick = {onClick}
        >
        {btnName}
        </button>
    )
}

export default ChatButton;