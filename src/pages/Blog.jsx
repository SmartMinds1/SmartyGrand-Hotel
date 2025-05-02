
import StylishBox from "../components/StylishBox";
import PayPopUp from "../components/popUps/PayPopUp";
import RegisterForm from "../components/Testas/RegisterForm";
import React, { useState } from 'react';
import Modal from "../components/popUps/Modal";
import Alert from "../components/popUps/Alert";
import Confirm from "../components/popUps/Confirm";



const Blog = () => {
    const [showModal, setShowModal] = useState(false);
    return(
        <div>
            <h1>Welcome to the blog page for testing different components</h1>
            
{/* Testa popUP */}
     <div style={{ padding: '2rem' }}>
      <h1>Welcome</h1>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 id="modal-title">This is a popup</h2>
        <p>You can put any content here.</p>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>

    <Alert/>


   {/*  testing alert popUp */}


        





            
            <div className="homeSection1">
                <p className="why_Us">| Why Us</p>
                <h1 className="h1Text">Where modern elegance meets serene nature!</h1>
               <StylishBox className="homeMessage1 TextDesign">
                    <p>Nestled amidst the bustling energy of the city, 
                       our hotel offers a serene escape where modern elegance
                       meets African charm. we pride ourselves on delivering an
                       unparalleled guest experience.
                    </p>
                    <div className="lightDesign"></div>
                    
               </StylishBox>
          </div>

          <div className="clear"></div>

          <RegisterForm/>

          <PayPopUp/>



            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <Confirm/>
            <br /><br /><br />
        
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      

        



    
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
}

export default Blog;



/* This is simple test for authentication */
/* import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useUser } from '../context/userContext'; 
import { useState, useEffect } from 'react'; */


/* const Login = ()=>{ */

  //Handling Login
 /*  const { user, setUser } = useUser();
  const handleLogin = () => {
      setUser({ name: 'John Doe', loggedIn: true });
  };  */

/*   simple lOGIN TEST */
/*   const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
          navigate('/login');
      } else {  */
          // Decode or verify token (for simplicity, assume backend has a /verify route)
      /*     axios
              .post('http://localhost:5000/verify', {}, { headers: { Authorization: `Bearer ${token}` } })
              .then((response) => {
                  setUsername(response.data.username);
              })
              .catch(() => {
                  localStorage.removeItem('token');
                  navigate('/login');
              });
      }
  }, [navigate]);

  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
  };  */

/*   return(
      <> */
         /* below is a simple test */
         /*  <div>
              <div className="clear"></div>
              <p>User: {user.name}</p>
              <button onClick={handleLogin}>Login</button>
          </div>
          <div>
              <h1>Welcome, {username}!</h1>
              <button onClick={handleLogout}>Logout</button>
          </div>  */

/*           <div className="loginBox">
               
          </div>
      </>
  );

} */
