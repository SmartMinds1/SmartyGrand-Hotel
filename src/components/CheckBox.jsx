import React from "react";
import "./CheckBox.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";

const CheckBox = ({children , classname})=>{
    return(
        <div className="checkBoxText">
           <span className={`checkedCircle ${classname}`}>
             <FontAwesomeIcon  icon={faCircleCheck} />
                {/*   <FontAwesomeIcon icon={faCircleCheck} /> , faCircleCheck */}
            </span>
        <h1>{children}</h1>
        </div>
     
    );
}

export default CheckBox;