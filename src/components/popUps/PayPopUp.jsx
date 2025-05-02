import './payPopUp.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Alert from './Alert';
import Modal from './Modal';

const PayPopUp = ({Amount, title, onClose }) => {

//Setting up our feedback popUp
    const [showModal, setShowModal] = useState(false);

//setting up the initial states ot the form
 const [formData, setFormData] = useState({
      username:"",
      email:"",
      phone:"",
      payment_code:"",
      checkin:"",
      checkout:"",
      guests:"",
      room:"",  
      });
  const[responseMessage, setResponseMessage] = useState("");

  //ensuring that the room is synced
  useEffect(() => {
    setFormData((prev) => ({ ...prev, room: title }));
  }, [title]);
  

//the handle change function will set the data from the field to the given variables
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.name] : e.target.value });
  }

//sending data to the database
  const handleSubmit = async(e)=>{
   //preventing defaut from submition when the submit button is clicked
        e.preventDefault();
        console.log("submitting payment data", formData);

        try{
              const response = await axios.post("http://localhost:5000/api/bookings",formData)
              setResponseMessage(response.data.message);
              setFormData({
                username:"",
                email:"",
                phone:"",
                payment_code:"",
                checkin:"",
                checkout:"",
                guests:"",
                room:"",  
      
              });//resetting the input fields
              
        }catch(error){
          setResponseMessage("ERROR! making Reservation, Kindly try again later!");
          
        }

  }


// Show modal only when responseMessage changes and is not empty
        useEffect(() => {
          if (responseMessage) {
            setShowModal(true);
          }
        }, [responseMessage]);


  return (
    <>
      <div className="popup-container">
        {/* Header */}
            <div className="popup-header urbanist">
                <h2><span>|</span> {title}</h2>
                <button onClick={onClose} className="popup-close-btn">
                  ✕ 
                </button>
            </div>
        {/* payment details and amount */}
            <div className="payMentAmount">
                <p><span>{Amount}$</span> Per Night</p>
                    <p>PAYBILL  : 247247<br />
              &nbsp;   ACC      :  <span>0115154402</span>
                </p>
            </div>

        {/* Payment Form */}
        {/* On submitting the given data, the information should be sent to the database */}
        <form onSubmit={handleSubmit}>
          <div className="popup-input-group">
            <input
              type="text"
              autoComplete='on'
              name="username"
              placeholder="full name"
              value={formData.username}
              onChange={handleChange}
              required
              maxLength="30"
            />
          </div>
          <div className="popup-input-row">
              <div className="popup-input-group">
                <input
                  type="email"
                  name="email"
                  size="35"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete='on'
                  maxLength="40"
                  required
                />
              </div>
              <div className="popup-input-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete='on'
                  maxLength="15"
                  required
                />
              </div>
          </div>

          <div className="popup-input-group">
                <label>Paste Mpesa code</label>
                <input
                  type="text"
                  name="payment_code"
                  placeholder="OA2025HIUG"
                  value={formData.payment_code}
                  onChange={handleChange}
                  autoComplete='on'
                  maxLength="10"
                  minLength="10"
                  required
                />
          </div>
          <div className="popup-input-row">
                <div className="popup-input-group">
                  <label>Check-In</label>
                  <input
                    type="date"
                    name="checkin"
                    value={formData.checkin}
                    onChange={handleChange}
                    autoComplete='on'
                    required
                  />
                </div>
                <div className="popup-input-group">
                  <label>Check-Out</label>
                  <input
                    type="date"
                    name="checkout"
                    value={formData.checkout}
                    onChange={handleChange}
                    autoComplete='on'
                    required
                  />
                </div>
                <div className="popup-input-group">
                  <label>GUESTS</label>
                  <input
                    type="number"
                    name="guests"
                    placeholder="1, 2, 3 ..."
                    value={formData.guests}
                    onChange={handleChange}
                    autoComplete='on'
                    maxLength={3}
                    max={500}
                    min={1}
                    required
                  />
                </div>
          </div>
          <button type="submit" className="popup-submit-btn urbanist">
            Finish Booking
          </button>
        </form>

      
      </div>

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

    </>
  );
};

export default PayPopUp;
