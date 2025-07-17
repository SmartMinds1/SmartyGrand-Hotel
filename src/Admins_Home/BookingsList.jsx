import React, { useEffect, useState } from "react";
import axios from "axios";
import Confirm from "../components/popUps/Confirm";
import DeleteModal from "../components/popUps/DeleteModal";
import useSearch from "../utils/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  //setting up feedback message using a popUp
      const [showModal, setShowModal] = useState(false);
      const [booking_ID, setBooking_ID] = useState("");

  //fetching bookings
  const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payments, Try agin Later", err);
        setLoading(false);
      }
    };

  //handle confirm sets given ID to a state variable
    const handleConfirm=(bookingId)=>{
      setBooking_ID(bookingId);
    }

  //This handles closing of confirm Modal
    const onCloseConfirm=() => {setShowModal(false);}
    
/* The data refresher when the tab is still open and a change is made */
    useEffect(() => {
      // Initial load
        fetchBookings(); 
    
      // Set up listener
        const handleListChange = () => {
          fetchBookings(); // Re-fetch Bookings
        };
    
        window.addEventListener("listChange", handleListChange);
    
      // Clean up
        return () => {
          window.removeEventListener("listChange", handleListChange);
        };
      }, []);

    // Reusable search hook. This is all we need for our users, search
       const { query, setQuery, filteredData } = useSearch(bookings, ["username", "email"]);

  //displaying the loading message
     if (loading) return <p>Loading Bookings...</p>;

  return (
    <div>
{/* This si the db Header. It is different across all lists due to search and order of items */}
      <div className="dbContentHeader">
            <div className="nameOfContentDisplayed">
               <h3>Bookings</h3>
            </div>
            <div className="sortBy">
              <p> Sort by</p>
              <select name="nameOfContent" id="nameOfContent">
                    <option value="Latest selected">Latest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Frequent">Frequent</option>
              </select>
            </div>
            <div className="searchBar">
              <FontAwesomeIcon icon={faSearch} className="search-icon"></FontAwesomeIcon>
                <input
                  type="text"
                  placeholder="username or email"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
            </div>
          
 
      </div>

    <div className="admin-section">
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>email</th>
            <th>checkin</th>
            <th>checkout</th>
            <th>guests</th>
            <th>room</th>
            <th>received_at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((booking, idx) => (
            <tr key={booking.id}>
              <td>{idx + 1}</td>
              <td>{booking.username}</td>
              <td>{booking.email}</td>
              <td>{new Date(booking.checkin).toISOString().split("T")[0]}</td>
              <td>{new Date(booking.checkout).toISOString().split("T")[0]}</td>
              <td>{booking.guests}</td>
              <td>{booking.room}</td>
              <td>{new Date(booking.created_at).toLocaleString()}</td>
              <td className="actionBtn">
                <p>...</p>
                  <ul className="actionList">
                    <li onClick={()=>{setShowModal(true); handleConfirm(booking.id);}}>delete</li>
                    <li>block</li>
                  </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* response message if the table is empty or failed to retrieve */}
       {filteredData.length===0 ? <p className="emptyTable">No Bookings found!</p> : ""}

{/*  Displaying the response messsage using a popUP. This is when deleting or updating within  the list */}
      <DeleteModal isOpen={showModal} fetchData={()=>fetchBookings()} onCloseConfirm={() => onCloseConfirm()} onClose={() => {
              setShowModal(false); 
          }}>
          <Confirm onCloseConfirm={() => onCloseConfirm()}
                   deleteUrl={`http://localhost:5000/api/bookings/${booking_ID}`}
                   deleteName="Booking"
                   fetchData={()=>fetchBookings()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </Confirm>
      </DeleteModal>
   </div>   
</div>
  );
};

export default BookingsList;
