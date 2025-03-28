import React /* { useEffect, useState } */ from 'react';
import "../styles/home.css";
import Button from "../components/Button";
import { formatDate } from '../utils/formatDate';
import TextBox from "../components/TextBox";
/* import ContentBox from "../components/ContentBox"; */
import MessageMover from '../components/MessageMover';
import StylishBox from "../components/StylishBox";
import ImageTextBox from '../components/Image_Text_Box';
import SearchBar from '../components/SearchBar';
import PromosCircle from '../components/PromosCircle';
import Chatform from '../components/Chatform';
import ChatButton from '../components/ChatButton';

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



{/* .................................This is the homepage Hero section................................. */}
{/* These are the BG anim images */}
      <div className="homeCaptionImage1"></div>
      <div className="homeCaptionImage2"></div>
         
{/* This is the intro shade and the catption text */}
          <div className="captionShader">
            <div className="captionFilter"></div>
            
              <div className="captionTextBox">
                  <div className="captionHeaderText  urbanist">
                      <h1>Your cozy home <br />away <span>from <br />home!</span></h1>
                  </div>

                  <div className="captionBodyText">
                      <p>Experience the Extraordinary! Book Your Stay <br />Today!</p>
                  </div>

                  <Button type="submit" btnLabel="Book Now"/> 
              </div>

              <div className="clear"> </div>
          </div>



{/* ...........................Search bar section......................... */}
               <SearchBar className="searchBar"/>

    {/*  This is the first caption paragraph */}
              <p className="WelcomeParagraph">| Your perfect escape begins here. |</p>



{/*  SIMPLE lOGIN TEST */}
      {/*   <div>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div> */}





{/* ..............................The WHY US section................................ */}
          <div className="homeSection1">
                <p className="why_Us">| Why Us</p>
                <h1 className="h1Text"><span>Offering,</span> a unique and exceptional experience!</h1>
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
                   {/*  <div className="style3 mainDivStyle">
                    </div> */}
                    <button>Explore More...</button>
                </div>
                </div>
            </div>
          <div className="clear"></div>





 {/*-------------------------------- This is the featured rooms and suits section -----------------------------*/}
           <div className='featuredRooms scrollSnap'>
               <p className="featuredRoomsHeader">| Featured rooms</p>
               <div className="featuredImagesDiv">
                    <ImageTextBox
                            className="featuredRoomContainer"
                            captionTitle ="| Deluxe rooms"
                            captionMessage="Luxury & Comfort Awaits!"
                            btnIcon = ""
                            btnAction = "submit"
                            >
                               <div className="featuredRoom1 divResize">  </div>
                    </ImageTextBox>
                    <ImageTextBox
                            className="featuredRoomContainer"
                            captionTitle ="| Family rooms"
                            captionMessage="Spacious, Cozy & Perfect!"
                            btnIcon = ""
                            btnAction = "submit"
                            >
                               <div className="featuredRoom2 divResize">  </div>
                    </ImageTextBox>
                    <ImageTextBox
                            className="featuredRoomContainer"
                            captionTitle ="| Cofference hall"
                            captionMessage="Seamless & productive events!"
                            btnIcon = ""
                            btnAction = "submit"
                            >
                               <div className="featuredRoom3 divResize">  </div>
                    </ImageTextBox>
                </div>
          </div>

      {/*     <LayoutTest/> */}


      

          

{/* ...........................This is the Testimonials section................................... */}
<div className="testimonialSection scrollSnap">
          <div className="testimonialsCaption">
                <p className="why_Us">| Our Testimonials</p>
                <h1 className="h1Text"><span>Here’s</span> what our clients have to say about us.</h1>
               <TextBox className="homeMessage1 TextDesign testimoniaLights">
                    <p>From our warm hospitality to our thoughtfully designed spaces. 
                        every detail is crafted to ensure comfort and satisfaction. 
                    </p>
               </TextBox>
               <TextBox className="homeMessage1 TextDesign testimoniaLights">
                    <p>But don’t just take our word for it—hear from our valued
                         guests who have experienced it firsthand.
                    </p>
               </TextBox>


          </div>
         {/*  This is the testimonial box to hold the users says */}
          <div className="clientTestimonials">
          <MessageMover/>
          </div>
          <div className="clear"></div>
 </div>
         

 <div className="bodyHr"></div>




{/*.............................. Special offers and promos section .................................*/}
<div className="promoSection scrollSnap">
         <p className="promosHeader">| Special Offers and Promos!</p>
         <h1 className="promoh1Text"><span>Stay in style – </span> unlock exclusive promos for  <br /> <span>unforgettable memories !</span></h1>

         <div className="promoParagraph">
          <p>Your perfect escape awaits! Join us today for amazing offers, top-tier comfort, and an experience you'll cherish forever!</p>
</div>

<div className="promosContainer">
        <PromosCircle 
            discountPercentage ="30%"
            discountTitle = "Family's package"
        />
        <PromosCircle
        discountPercentage ="10%"
        discountTitle = "Hikings"
        />
        <PromosCircle
        discountPercentage ="25%"
        discountTitle = "Meetings & Events"
        />
        <PromosCircle
        discountPercentage ="18%"
        discountTitle = "Couples"
        />
</div>

<div className="promoJoinUs">
      <p>Create an account or sign in today and start your journey toward relaxation__
      <Button type="submit" btnLabel="sign in"/> 
      <ChatButton 
           btnName= "sign up"     
       />
      </p>     
</div>

        
</div>

<div className="bodyHr"></div>


{/*..................... This is the chatBox section where users can send their feedback................ */}
<div className="homeChatSection scrollSnap">
    <div className="chatCaption">
      <h2><span>| Need help?</span> Start a conversation and let us take care of the rest!</h2>

      <p>Our team is here to help with a smile — fast, friendly, and reliable service every time!</p>
    </div>
  
    <Chatform/>   
</div>
         


       {/* This is a simple date at the end of our homePage */}
          <div className="captionDate">
              <p>{formatDate(today)}</p>
          </div>
     
      </div>
    </>
  );
}

export default Home;



