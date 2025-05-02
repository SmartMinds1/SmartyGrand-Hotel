import React,{useState, useEffect} from "react";
import axios from "axios";
import "./Confirm.css";
import DeleteModal from "./DeleteModal";
import DeleteAlert from "./DeleteAlert";

const Confirm = ({children, onCloseConfirm, deleteUrl, deleteName, fetchData})=>{

//setting up feedback message using a popUp
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

//HANDLING DELETE
    const handleDelete = async () => {
        try {
          const response = await axios.delete(deleteUrl);
          setResponseMessage(response.data.message); 
  
        } catch (error) {
          setResponseMessage(`Failed to delete ${deleteName}`, error.response?.data || error);
        }
      };
  
   
// Show modal only when responseMessage changes and is not empty
        useEffect(() => {
          if (responseMessage) {
            setShowModal(true);
          }
        }, [responseMessage]);

    return(
        <>
        <div className="confirm">
           <div>
               {children}
           </div>
           <div className="confirmBtnBox">
                <button className="cancelBtn" onClick={onCloseConfirm}>Cancel</button>
                <button className="confirmBtn" onClick={()=>handleDelete()}>Confirm</button>
           </div> 
        </div>
        
{/*  Displaying the response messsage using a popUP. This is when deleting or updating within  the list */}
       <DeleteModal isOpen={showModal}  onCloseConfirm={() => onCloseConfirm()}  fetchData={()=>fetchData()}  onClose={() => {
              setShowModal(false); 
              setResponseMessage("");//reset so that to trigger useEffect on the second time
          }}>
          <DeleteAlert onClose={() => {
              setShowModal(false); 
              setResponseMessage(""); 
                }
              }
              onCloseConfirm={() => onCloseConfirm()} 
              fetchData={()=>fetchData()} 
          >
              <p className="responseMessage">{responseMessage}</p>
          </DeleteAlert>
      </DeleteModal>
      
        </>
    );
}
export default Confirm