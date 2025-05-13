import React, { useState, useEffect } from "react";
import "../styles/loginSignUp.css";
import Modal from "../components/popUps/Modal";
import Alert from "../components/popUps/Alert";
import axios from "axios";

const ForgotPassword = ({closeForgotPass}) => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  //setting up a simple modal to show our response message nicely
  const[showModal, setShowModal] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: email.trim().toLowerCase(), //sending 'email' key
        }
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong. Please try again later");
    }
  };

  // Show modal only when responseMessage changes and is not empty
  useEffect(() => {
    if (responseMessage) {
      setShowModal(true);
    }
  }, [responseMessage]);

  return (
    <>
      <div className="auth-container">
        {/* Header */}
            <div className="auth-header urbanist">
                <div>
                 <h2 className="forgotH2">Reset your Password</h2>
                </div>
                <button onClick={closeForgotPass} className="auth-close-btn">
                  ✕ 
                </button>
            </div>

            {/* SignIn Form */}
            <form onSubmit={handleReset}>
                  <div className="auth-input-group">
                    <input
                      type="email"
                      name="email"
                      size="35"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete='on'
                      maxLength="40"
                      required
                    />
                  </div>
              
                  <button type="submit" className="auth-submit-btn urbanist">
                      Send Reset Link
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

export default ForgotPassword;
