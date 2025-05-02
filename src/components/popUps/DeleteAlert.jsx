import React from "react";
import "./Alert.css";

const DeleteAlert = ({children, onCloseConfirm, onClose, fetchData})=>{

    return(
        <div className="alert">
           <div>
           {children}
           </div>
            <button className="okBtn" onClick={() => {
                        onClose();    // closes the alert modal
                        onCloseConfirm();  // closes the confirm modal
                        fetchData();
             }} 
             >
                OK
            </button>
        </div>
    );
}
export default DeleteAlert