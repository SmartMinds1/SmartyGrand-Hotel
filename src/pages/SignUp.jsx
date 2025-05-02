import '../styles/loginSignUp.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/popUps/Modal';
import Alert from '../components/popUps/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = ({ closeSignUp, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

//signUP modal and response message
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting SignUp Details", formData);

  // Normalize email before sending
    const normalizedFormData = {
      ...formData,
      email: formData.email.trim().toLowerCase(), username: formData.username.trim().toLowerCase(),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", normalizedFormData);
      setResponseMessage(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
      });

   // Mark success to trigger the next phase. Onsuccess if a function that will manage clossing of signUp and opening of SingIn
      onSuccess(response.data.message);


    } catch (error) {
      //Use specific message from backend if available
      setResponseMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  //Only show modal if the response message Exists
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
          <h2>Welcome! Join Us</h2>
          <button onClick={closeSignUp} className="auth-close-btn">
            ✕
          </button>
        </div>

        {/* SignUp Form */}
        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <input
              type='text'
              autoComplete='on'
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              maxLength="30"
              required
            />
          </div>

          <div className="auth-input-group">
            <input
              type="email"
              name="email"
              size="35"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete='on'
              maxLength="40"
              required
            />
          </div>

          <div className="auth-input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete='off'
              maxLength="20"
              required
            />
            <span
                className="password-toggle-icon-register"
                onClick={() => setShowPassword(prev => !prev)}
              >
                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
          </div>

          <button type="submit" className="auth-submit-btn urbanist">
            Sign Up
          </button>
        </form>

        <p className='authOption'>Already have an account? <span>sign in</span></p>
        
      </div>

{/*  Displaying the response messsage using a popUP */}
      <Modal isOpen={showModal} onClose={() => {
        setShowModal(false);
        setResponseMessage("");
      }}>
          <Alert onClose={() => {
            setShowModal(false);
            setResponseMessage("");
          }}>
            <p className="responseMessage">{responseMessage}</p>
          </Alert>
      </Modal>
    </>
  );
};

export default SignUp;
