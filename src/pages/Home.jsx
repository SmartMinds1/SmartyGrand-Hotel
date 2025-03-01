import React /* { useEffect, useState } */ from 'react';
import "../styles/home.css";
import MyForm from "../components/MyForm";
import Button from "../components/Button";
import { formatDate } from '../utils/formatDate';
import TextBox from "../components/TextBox";
/* import ContentBox from "../components/ContentBox"; */
import MessageMover from '../components/MessageMover';
import StylishBox from "../components/StylishBox";

/* import { useNavigate } from 'react-router-dom';
import axios from 'axios'; */

/* import { useUser } from '../context/userContext'; */

function Home() {
    const today = new Date();

    //Handling Login
  /*   const { user, setUser } = useUser();
    const handleLogin = () => {
        setUser({ name: 'John Doe', loggedIn: true });
    }; */

  /*   simple lOGIN TEST */
    /* const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        } else { */
            // Decode or verify token (for simplicity, assume backend has a /verify route)
           /*  axios
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
    }; */


  return (
    <>
      <div className="Home">
        <div>
           
           <div className="clear"></div>

          {/*  <p>User: {user.name}</p>
            <button onClick={handleLogin}>Login</button> */}
         </div>

{/* This is the homepage intro caption */}
        <div className="homeCaptionImage1">
          </div>
        <div className="homeCaptionImage2">
          </div>
        

          <div className="captionShader">
              <div className="captionTextBox">
                  <div className="captionHeaderText">
                      <h1>Your cozy home <br />away from <br />home!</h1>
                  </div>

                  <div className="captionBodyText">
                      <p>Experience the Extraordinary! Book Your Stay Today!</p>
                  </div>

                  <div className="captionDate">
                      <p>{formatDate(today)}</p>
                  </div>
              </div>
              <div className="clear"></div>
          </div>
      

{/* SIMPLE lOGIN TEST */}
      {/*   <div>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div> */}






{/*  This is the first paragraph */}
<p className="WelcomeParagraph">| Welcome to Smarty Grand Hotel,your perfect escape begins here. |</p>

{/* This is the first message section of the homepage */}
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
          <div className="section1RightImage">
            <div className="style1 mainDivStyle">
                <div className="style2 mainDivStyle">
                    <div className="style3 mainDivStyle">
                    </div>
                </div>
            </div>
          </div>
          <div className="clear"></div>

          <div className="bodyHr"></div>

{/* This is the second message section of the homepage */}
          <div className="homeSection2">
                <p className="why_Us">| Our Testimonials</p>
                <h1 className="h1Text">This is what our clients had to say about Us</h1>
               <TextBox className="homeMessage1 TextDesign">
                    <p>Nestled amidst the bustling energy of the city, 
                       our hotel offers a serene escape where modern elegance
                       meets African charm. we pride ourselves on delivering an
                       unparalleled guest experience.
                    </p>
               </TextBox>
          </div>
          <div className="clientTestimonials">
          <MessageMover/>
          </div>

        

        <MyForm />
        <Button />

        <br />
        <br />
        <br />
     
      </div>
    </>
  );
}

export default Home;



