import React from "react";
import ChatButton from "./ChatButton";
import "./ImageTextBox.css";

 const Image_Text_Box = ({children, captionTitle, captionMessage, btnIcon, btnAction})=>{
    return(
        <div>
            <div className="imageDiv">
                {children}

                <div className="captionDiv">
                    <p>
                        {captionTitle}
                    </p>
                    <p>
                        {captionMessage}
                    </p>
                    <div className="featuredBtn">
                        <ChatButton 
                            onClick={btnAction}
                            btnName= "view more ..."
                            icon = {btnIcon}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
 }

 export default Image_Text_Box