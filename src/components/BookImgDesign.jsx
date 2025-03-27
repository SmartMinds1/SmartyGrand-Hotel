import React from "react";
import './BookImgDesign.css';

const BookImgDesign = ({children})=>{
    return(
        <div className="bookImgContainer">
            <div className="roomDetailsBox">
                {children}
            </div>
        </div>
    );
}

export default BookImgDesign