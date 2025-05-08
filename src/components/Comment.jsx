import React, { useState, useEffect } from "react";
import Modal from "./popUps/Modal";
import Button from "./Button";
import Alert from "./popUps/Alert";
import './Comment.css';
import axios from "axios";

const Comment = ()=>{

//use state for sendig message to the database
const[formdata, setFormdata] = useState({username:"", comment:"",})
const[responseMessage, setResponseMessage] = useState("");

//Setting up our responsc popUp
const [showModal, setShowModal] = useState(false);

//retrieving and setting up form data values
const handleChange = (e)=>{
  setFormdata({...formdata, [e.target.name]: e.target.value });

}

//submitting form data values to the database
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("submitting testimonials", formdata);

      try{
        const response = await axios.post("http://localhost:5000/api/testimonials", formdata);
        setResponseMessage(response.data.message);
        setFormdata({username:"", comment:""});
      }catch(error){
        setResponseMessage("ERROR submitting message. Try gain later");

      }
}

// Show modal only when responseMessage changes and is not empty
      useEffect(() => {
        if (responseMessage) {
          setShowModal(true);
        }
      }, [responseMessage]);


    return(
        <>
         <div className="sendTestimonial">
                <form onSubmit={handleSubmit} className="testimonialForm">
                    <input 
                    type="text"
                    id="username"
                    size="20"
                    name="username" 
                    placeholder="username"
                    value={formdata.username}
                    onChange={handleChange}
                    required
                    autoComplete="on"
                    maxLength="30"
                    minLength="3"
                    />

                    <textarea
                 /*    cols="30" 
                    rows="6" */
                    id="comment"
                    name="comment" 
                    placeholder="Leave us a comment"
                    value={formdata.comment}
                    onChange={handleChange}
                    required
                    resizable="false"
                    >
                    </textarea>
                
                    
                    <Button  type="submit" btnLabel="Comment"/> 

                </form>

    {/*  Displaying the response messsage using a popUP */}
                <Modal isOpen={showModal} onClose={() => {
                        setShowModal(false); 
                        setResponseMessage("");//reset so that to trigger useEffect on the second time
                    }}>

                    <Alert onClose={() => {
                        setShowModal(false); 
                        setResponseMessage("");
                    }}
                    >
                        <p className="responseMessage">{responseMessage}</p>
                    </Alert>
                </Modal>
      </div>
        </>
    );
}

export default Comment;