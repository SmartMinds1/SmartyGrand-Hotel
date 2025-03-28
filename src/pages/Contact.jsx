import React from 'react';
import "../styles/contact.css";
import OfficeTelephone from "../assets/TransparentPhone.png";
import TextBox from "../components/TextBox";
import CheckBox from "../components/CheckBox";
import ChatButton from '../components/ChatButton';
import { FaPhoneAlt, FaEnvelope, FaComments } from 'react-icons/fa';
import Chatform from '../components/Chatform';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import HotelMap from '../components/HotelMap';



const Contact = () => {

/* The methods below will hadle calls, chats and Emails */
    const handleCall = () =>{
        window.location.href="tel: +25415154402";

    }

    const handleEmail = () =>{
        window.location.href="mailto:learnerssmart1@gmail.com";
    }

    const handleCommunity = () =>{
        alert("Follow community using the link below...");

    }



/*.......................Below is the CONTACT JSX................................ */
    return (
        <div>

           <h1 className="contact_Us">| Connect with Us</h1>

{/* Indicating name and location of our hotel */}
            <div className="locationSection">
                    <div className="nameAndLocation">
                            <p><span className='locationIcon'> <FontAwesomeIcon icon={faMapMarkerAlt}/> </span>Nairobi KE</p>
                            <p><i>Max_Buiding, Next To Hilax Gardens. Along WaterFalls Avenue! <br />
                                P.O Box 1279-20100, <br />
                                Nairobi.</i></p>
                    </div>
                    <div className="mapContainer">
                      {/*   <MapComponent/> */}

                        <HotelMap/>
                    </div>
           </div>

           <div className="contactIntroImg">
                 <figure className='OfficeTelephone'>
                    <img src={OfficeTelephone} alt="OfficeTelephone" width="400" height="300" />
                </figure>

                <div className="phoneImageShadder">
                    <p>One Call Away!</p>
                </div>
            </div>




            <div className="contactIntro">
               

            <h1>|<span> Always here,</span> to assist you! <br />&nbsp;As you create unforgettable <br />&nbsp;  memories. </h1>

            <TextBox className="contactMessage1 TextDesign">
                    <p>Whether you have questions, special requests, or need help planning your stay, our dedicated team is just a call or email away. Reach out to us anytime—day or—night. Focus on your business objectives while we handle all the logistics.
                    </p>
            </TextBox>
            </div>

            <div className="clear"></div>

            <div className="contactCheckBox1">
                <CheckBox>
                    <h1>ALWAYS FRIENDLY</h1>
                </CheckBox>
                <CheckBox>
                    <h1>QUICK</h1>
                </CheckBox>
                <CheckBox>
                    <h1>HELPFUL</h1>
                </CheckBox>
                <CheckBox>
                    <h1>RELIABLE</h1>
                </CheckBox>
            </div>
           
{/* ....................... This is the contact chatbox section ..............................*/}

            <div className="contactChatSection">
                 <div className="chatCaption">
                     <h2><span>| Need help?</span> Start a conversation and let us take care of the rest!</h2>
                     <p>Our team is here to help with a smile — fast, friendly, and reliable service every time!</p>
                 </div>
                 <Chatform/>   
             </div>

{/*..........................This is the email Call and community section.......................*/}
            <div className='callEmailChat'>
                    <div className="call_E_ChatDesign emailBox">
                        <CheckBox>
                        <h1>Email Us</h1>
                        </CheckBox>
                        <TextBox className=" TextDesign">
                          <p>
                          Reach out anytime! Email us your queries, and we’ll craft the perfect experience for you.
                          <ChatButton 
                             onClick={handleEmail}
                             btnName= "Email us"
                             icon = {FaEnvelope}
                          />
                          </p>
                        </TextBox>
                    </div>
                
                    <div className="call_E_ChatDesign callBox">
                        <CheckBox>
                        <h1>Call Us</h1>
                        </CheckBox>
                        <TextBox className=" TextDesign">
                          <p>
                          Call us today for personalized assistance. We're here to make your stay truly unforgettable!
                          <ChatButton 
                             onClick={handleCall}
                             btnName = "call us"
                             icon = {FaPhoneAlt}
                          />
                          </p>
                        </TextBox>
                    </div>

                    <div className="call_E_ChatDesign chatBox">
                        <CheckBox>
                        <h1>Community Support</h1>
                        </CheckBox>
                        <TextBox className=" TextDesign">
                          <p>
                          Our community is very supportive. Visit the team and get most of your questions aswered.
                          <ChatButton 
                             onClick={handleCommunity}
                             btnName ="visit"
                             icon = {FaComments}
                          />
                          </p>
                        </TextBox>
                    </div>
            </div>


{/* .....................This is the location details section.................................... */}


            <h1 className="finalContactComment">| Your comfort and satisfaction are our top priorities, and we look forward to making your experience with us truly exceptional.</h1>
        </div>

        );
};

export default Contact;
