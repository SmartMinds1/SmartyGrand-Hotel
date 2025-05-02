import "./Chatform.css";
import Button from "./Button";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from "./popUps/Modal";
import Alert from "./popUps/Alert";

//Begining of chatForm
const Chatform = () => {
//states for input data and the response message from the API
    const[formData, setFormData] = useState({username:"", email:"", message:""});
    const[responseMessage, setResponseMessage] = useState("");

//Setting up our response
  const [showModal, setShowModal] = useState(false);

//The handle change function sets the formdata with the user inputs
const handleChange = (e)=>{
  setFormData({...formData, [e.target.name]: e.target.value})
}

//handleSubmit sends the user inputs to the database
const handleSubmit = async (e) => {
   e.preventDefault();
   console.log("submitting user message", formData);

    try {
        const response = await axios.post("http://localhost:5000/api/messages", formData);
        setResponseMessage(response.data.message);
        setFormData({username:"", email:"", message:""});
        }
        
    catch(error){
      setResponseMessage("ERROR! sending the message, Kindly try again later!");
     }
}


 // Show modal only when responseMessage changes and is not empty
 useEffect(() => {
  if (responseMessage) {
    setShowModal(true);
  }
}, [responseMessage]);


return (
//main div
<div className="Chatform">
    <div className="chatFormCaption">
          <h1>One call away!</h1>
    </div>
    
    <form onSubmit={handleSubmit}>
              <div className="formtable">
                    <div className="Insidetable">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        size="20"
                        placeholder="username"
                        autoComplete="on"
                        maxLength="30"
                        minLength="3"
                        required
                        value={formData.username}
                        onChange={handleChange}
                      />
                      <div className="inputDivHr1"></div>
                    </div>

                    <div className="Insidetable">
                      <input
                        type="email"
                        size="20"
                        name="email"
                        autoComplete="on"
                        id="email"
                        maxLength="40"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="inputDivHr2"></div>

                    <textarea 
                        className='textArea'
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder='Your Message'
                        rows="10"
                        cols="40"
                    />

                    <Button  type="submit" btnLabel="Submit"/> 
              </div>
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
  );
};

export default Chatform;
