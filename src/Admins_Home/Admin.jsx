import React, { useState, useEffect } from 'react';
import './admin.css';
import AdminNavIcons from '../components/AdminNavIcons';
import UsersList from './UsersList';
import MessagesList from './MessagesList';
import CommentsList from './CommentsList';
import BookingsList from './BookingsList';
import PaymentsList from './PaymentsList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faEnvelope,
  faCommentDots,
  faMoneyCheckAlt,
  faCalendarCheck,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

//for decoding the logged user/ADMIN
  import { jwtDecode } from "jwt-decode";


//The UI part
const Admin = () => {

    //Active Admin's name
    const [activeAdmin, setActiveAdmin] = useState("");

    //Decode the name from the token
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
    
        const decoded = jwtDecode(token);
        setActiveAdmin(decoded.username);
      }
    }, []);


    //below are the state variables to set the active tabs
    const [activeTab, setActiveTab] = useState("users"); // 'users' by default


    //setting up states for all the counts
        const[usersCount, setUsersCount] = useState("");
        const[messagesCount, setMessagesCount] = useState("");
        const[bookingsCount, setBookingsCount] = useState("");
        const[paymentsCount, setPaymentsCount] = useState("");
        const[commentsCount, setCommentsCount] = useState("");
     
       
        //fetching user counts
            const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users");
                setUsersCount(res.data);
            } catch (err) {
                console.error("Error fetching users count:", err);
            }
            };
        //fetching Message counts
        const fetchMessages = async () => {
            try {
              const res = await axios.get("http://localhost:5000/api/messages");
              setMessagesCount(res.data);
            } catch (err) {
              console.error("Error fetching messages count:", err);
            }
          };

        //fetching Booking counts
        const fetchBookings = async () => {
            try {
              const res = await axios.get("http://localhost:5000/api/bookings");
              setBookingsCount(res.data);
            } catch (err) {
              console.error("Error fetching payments count", err);
            }
          };

        //fetching Payment counts
        const fetchPayments = async () => {
            try {
              const res = await axios.get("http://localhost:5000/api/payments");
              setPaymentsCount(res.data);
            } catch (err) {
              console.error("Error fetching Counts!", err);
            }
          };

        //fetching Comment counts
        const fetchComments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/testimonials");
            setCommentsCount(res.data);
        } catch (err) {
            console.error("Error fetching Comments count", err);
        }
        };

//Initial fetching of all counts
        useEffect(() => {
            fetchUsers();
            fetchMessages();
            fetchBookings();
            fetchPayments();
            fetchComments();
        },[]);

     return (
        <div className="admin-dashboard">

{/*......................... dashBoard headings ...........................*/}
           <div className="mainBoard">
                   <div className="headerDiv">
                        <h2> <span>&#9776;</span> DASHBOARD</h2>
                        <h1><span>smarty</span>Grand</h1>
                        <div className="adminDiv">
                            <div className="adminProfile"></div>
                            <p>{activeAdmin}</p>
                        </div>
                        
                   </div>
                    

                    <div className="mainDiv">
                        {/* this is the wrapping div which will tie the icons div and the navDiv */}
                        <div className="wrapper">
                                <div className="iconsDiv">
                                <AdminNavIcons setActiveTab={setActiveTab}/>
                                </div>

                               
                        {/* This is the nav links div and the profile pic */}
                                <div className="navDiv">
                                        <div className='hello'>
                                            <div className="profile"> </div>
                                            <p><span>Hi</span> {activeAdmin}!</p>
                                        </div>
                                        <ul>
                                            <li onClick={()=>{setActiveTab("users"); fetchUsers();}}>Users</li>
                                            <li onClick={()=>{setActiveTab("bookings"); fetchBookings();}}>Bookings</li>
                                            <li onClick={()=>{setActiveTab("messages"); fetchMessages();}}>Messsages</li>
                                            <li onClick={()=>{setActiveTab("payments"); fetchPayments();}}>Payments</li>
                                            <li onClick={()=>{setActiveTab("comments"); fetchComments();}}>Testimonials</li>
                                            <li>Admins</li>
                                        </ul>
                                </div>
                        </div>

                       {/* this is the main content div that will display the data retrieved from the database */}
                        <div className="contentDiv">

                        {/*  this displays the number of different items from the database */}
                             <div className="contentHeader">

                               {/* users */}
                                   <div className="box" onClick={()=>{setActiveTab("users"); fetchUsers();}}>
                                    <p>
                                        <span id="userCount">{usersCount.length}</span> <br />
                                        Users
                                    </p>
                                    <i> <FontAwesomeIcon icon={faUsers} /> </i>
                                    </div>

                               {/* messages */}
                                    <div className="box" onClick={()=>{setActiveTab("messages"); fetchMessages();}}>
                                        <p>
                                            <span id="messageCount">{messagesCount.length}</span> <br />
                                            Messages
                                        </p>
                                        <i> <FontAwesomeIcon icon={faEnvelope} /> </i>
                                    </div>

                               {/* bookings */}
                                    <div className="box" onClick={()=>{setActiveTab("bookings"); fetchBookings();}}>
                                        <p>
                                            <span id="bookingCount">{bookingsCount.length}</span> <br />
                                            Bookings
                                        </p>
                                        <i> <FontAwesomeIcon icon={faCalendarCheck} /> </i>
                                    </div>

                                {/* payments */}
                                    <div className="box" onClick={()=>{setActiveTab("payments"); fetchPayments();}}>
                                        <p><span id="paymentCount">{paymentsCount.length}</span> <br />
                                            Payments
                                        </p>
                                        <i> <FontAwesomeIcon icon={faMoneyCheckAlt} /> </i>
                                    </div>

                                {/* testimonials */}
                                    <div className="box" onClick={()=>{setActiveTab("comments"); fetchComments();}}>
                                        <p><span id="commentsCount">{commentsCount.length}</span> <br />
                                            Testimonials
                                        </p>
                                        <i> <FontAwesomeIcon icon={faCommentDots} /> </i>
                                    </div>

                                {/* admins */}
                                    <div className="box" onClick={()=>setActiveTab("admins")}>
                                        <p><span id="paymentCount">0</span> <br />
                                            Admins
                                        </p>
                                        <i> <FontAwesomeIcon icon={faUserShield} /> </i>
                                    </div>

                              </div>



            {/*  ----------DB DATA DISPLAY -----------*/}
     

    {/* This is our display div where we display the content retrieved from the database */}
                          <div className="dbContent">
                                {activeTab === "users" && <UsersList/>}
                                {activeTab === "bookings" && <BookingsList/>}
                                {activeTab === "payments" && <PaymentsList/>}
                                {activeTab === "comments" && <CommentsList/>} 
                                {activeTab === "messages" && <MessagesList/>}
                          </div>

                        </div>  
                    </div>
            </div>

        
{/*.............................. End of the dashBoard ............................... */}



        </div>
    );
}

export default Admin;