import React from "react";
import "./ImageTextBox.css";

 const Image_Text_Box = ({children})=>{
    return(
        <div>
            <div className="imageDiv">
                {children}
            </div>
        </div>
    )
 }

 export default Image_Text_Box