import React from "react";
import './promosCircle.css';

const PromosCircle = ({discountTitle, discountPercentage})=>{
    return(
        <div className="appearOnScroll">
            <div className="outerCircle">
                <p className="outerCircleTitle">{discountTitle}</p>
                <div className="innerCircle">
                    <p>{discountPercentage}</p>
                    <p>Discount!</p>
                </div>
            </div>

        </div>
    );
}

export default PromosCircle