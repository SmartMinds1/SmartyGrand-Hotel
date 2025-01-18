import React, { useState } from 'react';
import "../styles/contact.css";
import OfficeTelephone from "../assets/TransparentPhone.png";
import TextBox from "../components/TextBox";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import ChatButton from '../components/ChatButton';
import { FaPhoneAlt, FaEnvelope, FaComments } from 'react-icons/fa';
import MyForm from '../components/MyForm';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert('Failed to submit the form.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };
    


    /* The methods below will hadle calls, chats and Emails */

    const handleCall = () =>{
        window.location.href="tel: +25415154402";

    }

    const handleEmail = () =>{

        window.location.href="mailto:learnerssmart1@gmail.com";
    }

    const handleChat = () =>{

        alert("chat will start shortly...");

    }

    return (
        <div>

            <p className="contact_Us">| Conctact Us</p>

           <div className="contactIntroImg">
                <figure className='OfficeTelephone'>
                    <img src={OfficeTelephone} alt="OfficeTelephone" width="400" height="300" />
                </figure>

                <div className="phoneImageShadder">
                    <p>One Call Away!</p>
                </div>

            </div>




            <div className="contactIntro">
               

                <h1>Always here to assist you! As you create unforgettable memories. </h1>

            <TextBox className="contactMessage1 TextDesign">
                    <p>Whether you have questions, special requests, or need help planning your stay, our dedicated team is just a call or email away. Reach out to us anytime—day or—night. Focus on your business objectives while we handle all the logistics.
                    </p>
            </TextBox>
            </div>

            <div className="clear"></div>

            <div className="contactCheckBox1">
                <CheckBox>
                    <h1>Lets know how we can help you</h1>
                </CheckBox>
            </div>
           
            <form className='contactForm' onSubmit={handleSubmit}>
                 <MyForm  />
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
                    <br />
                <Button type="submit" btnLabel="Submit"/> 
            </form>


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
                        <h1>Chat with Us</h1>
                        </CheckBox>
                        <TextBox className=" TextDesign">
                          <p>
                          Chat with us now for instant support! Your comfort and convenience are our top priorities.
                          <ChatButton 
                             onClick={handleChat}
                             btnName ="Start chat"
                             icon = {FaComments}
                          />
                          </p>
                        </TextBox>
                    </div>
            </div>



            <h1 className="finalContactComment">| Your comfort and satisfaction are our top priorities, and we look forward to making your experience with us truly exceptional.</h1>
        </div>

        );
};

export default Contact;
