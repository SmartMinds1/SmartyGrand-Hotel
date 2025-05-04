import '../styles/loginSignUp.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/popUps/Modal';
import Alert from '../components/popUps/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const SignIn = ({ onClose , signUpResponse}) => {
//setting up the initial states ot the form
  const [formData, setFormData] = useState({
      username:"",
      password:""
      });

//for page navigation
  const navigate = useNavigate();

//Setting up our feedback popUp
  const [showModal, setShowModal] = useState(false);
  const[responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


//sets the data from the field to the given variables
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.name] : e.target.value });
  }

//sending data to the db
  const handleSubmit = async(e)=>{
   //preventing default form submition
        e.preventDefault();
        console.log("submitting Sign In Details", formData);

    // Normalize username before sending
        const normalizedFormData = {
          ...formData,
          username: formData.username.toLowerCase().trim(),
        };

        try{
              const response = await axios.post("http://localhost:5000/api/auth/login", normalizedFormData)
              setResponseMessage(response.data.message);
              setFormData({
                username:"",
                password:"",
              });//resetting the input fields

        const { accessToken, refreshToken } = response.data;
          // Store the tokens securely (localStorage/sessionStorage)
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", refreshToken);

        // Redirect to the protected route (e.g., dashboard)
           navigate("/dashboard");

              
        }catch(error){
          setResponseMessage(
            error.response?.data?.message || "Login failed. Please try again."
          );
          
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
      <div className="auth-container">
        {/* Header */}
            <div className="auth-header urbanist">
                <div>
                  {signUpResponse ? <div className='headerMessage'><h3>{signUpResponse}</h3> <p> Now log in</p></div> : <h2>Welcome Back!</h2>}
                </div>
                <button onClick={onClose} className="auth-close-btn">
                  ✕ 
                </button>
            </div>

        {/* SignIn Form */}
        <form onSubmit={handleSubmit}>
              <div className="auth-input-group">
                <input
                   type="text"
                   name="username"
                   placeholder="Username"
                   size="35"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete='on'
                  maxLength="20"
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
                  className="password-toggle-icon-login"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
          
              <button type="submit" className="auth-submit-btn urbanist">
                  sign in
              </button>
        </form>

         <p className='authOption'>Don't have an account? <span>sign up</span></p>
         <div className="auth-forgot-password">
              <p onClick={() => navigate('/forgot-password')} className="forgot-password-link">
                Forgot Password?
              </p>
          </div>

      
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

export default SignIn;
