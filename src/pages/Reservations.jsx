import React, { useState, useEffect } from "react";
import '../styles/Reservation.css'
import TextBox from "../components/TextBox";
import SearchBar from "../components/SearchBar";

import RoomsHolder from "../components/RoomsHolder";




const Reservations = ()=>{

  const [activeTab, setActiveTab] = useState('DELUXE');

/* create an array of tabs to help in navigation */
   const tabs = ['DELUXE', 'FAMILY', 'CONFERENCE', 'SPA', 'GYM'];






//diclaring an array of items
    const [items, setItems] = useState([
        {
          id: 1,
          name: 'Events Solution',
          description: 'Focus on your business objectives while we handle all the logistics.',
          className: 'imageDiv1',
        },
        {
          id: 2,
          name: 'Family rooms',
          description: 'Thoughtfully designed rooms to ensure a comfortable and memorable family vacation.',
          className: 'imageDiv2',
        },
        {
          id: 3,
          name: 'SPA Retreats',
          description: 'Surrender to the healing touch of our skilled therapists',
          className: 'imageDiv3',
        },
        {
          id: 4,
          name: 'Deluxe Rooms',
          description: 'Step into serenity and sophistication with our Sanctuary Deluxe Rooms',
          className: 'imageDiv4',
        },
        {
          id: 5,
          name: 'Honeymoon Suites',
          description: 'Indulge in the epitome of romance at our exquisite Honeymoon Suite',
          className: 'imageDiv5',
        },
        {
          id: 6,
          name: 'Gym Solutions',
          description: 'Focus on your business objectives while we handle all the logistics.',
          className: 'imageDiv6',
        },
        {
          id: 7,
          name: 'Events Solution',
          description: 'Focus on your business objectives while we handle all the logistics.',
          className: 'imageDiv7',
        },
      ]);


/* fuction to rotate the image items */
      const rotateItems = () => {
        setItems(prevItems => {
          const firstItem = prevItems[0]; // Get the first item
          return [...prevItems.slice(1), firstItem]; // Move the first item to the end
        });
      };
      

//useEffect to track all changes
        useEffect(() => {
            const interval = setInterval(rotateItems, 8000); // Rotate every 8 seconds
            return () => clearInterval(interval); // Cleanup on unmount
        }, []);



    return(
        <>
    
{/*......................... Reserve room SECTION 1....................... */}
<div className="reserveSection1 scrollSnap">
        {/* IMAGE SLIDER */}
    <div className="section1ImageSlider">
        <div className="slide">
            {items.map(item => (
                <div key={item.id} className={`${item.className} sliderItem`}>
                    <div className="content">
                        <div className="booking_name">| {item.name}</div>
                        <div className="booking_Des">{item.description}</div>
                        <button>View More</button>
                    </div>
                </div>
            ))}
        </div>
    </div>



{/* CAPTION PARAGRAPH */}
    <div className="Section1TextCaption">
               <h1>| Enjoy seemless bookings! <br />&nbsp; create,  
                   <span> unforgettable <br />&nbsp;  memories. </span> 
               </h1>
   
               <TextBox className="contactMessage1 TextDesign">
                       <p>Whether you have questions, special requests, or need help planning your stay, our dedicated team is just a call or email away. Reach out to us anytime—day or—night. Focus on your business objectives while we handle all the logistics.
                       </p>
               </TextBox>
    </div>


</div>



{/*......................... Reserve room SECTION 2....................... */}
  <div className="reserveSection2  scrollSnap">
          <h3><span>| Seamless booking,</span> it's never been this Quick!</h3>

          <div className="selectRoomBar">
                <SearchBar/>
                <ul className="tabs">
                        {tabs.map((tab) => (
                          <li
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                              >
                              {tab}
                          </li>
                      ))}
                </ul>
        </div>

        <div className="roomsHolderMover">
                 {/* Content */}
                    <div className="tab-content">
                          {activeTab === 'DELUXE' && (
                              <div className="deluxeRooms">
                                  <RoomsHolder/>
                              </div>
                          )}


                          {activeTab === 'FAMILY' && (
                              <div className="FamilyRooms">
                                  <RoomsHolder/>
                              </div>
                          )}


                          {activeTab === 'CONFERENCE' && (
                              <div className="ConfferenceHalls">
                                  <RoomsHolder/>
                              </div>
                          )}


                          {activeTab === 'SPA' && (
                            <div className="spaServices">
                                   <RoomsHolder/>
                            </div>
                          )}


                          {activeTab === 'GYM' && (
                             <div className="gymServices">
                                   <RoomsHolder/>
                             </div>  
                          )}
                    </div>




              
               
              
              
                    
        </div>

  </div>



{/*......................... Reserve room SECTION 3....................... */}
<div className="reserveSection3  scrollSnap">
          <h2>| Our Booking <span>Guidlines</span></h2>
          <div className="reservationGuidlines">
            <ul>
              <li>Make sure to have your original ID/PASSPORT</li>
                <li>Strictly No weapons allowed</li>
                  <li>No drugs allowed</li>
                    <li>Observe CHECK-IN and CHECK-OUT</li>
                      <li>Chlidren to be accampanied by their gurdians at all times</li>
             </ul>
          </div>
          <div className="reservationGuidlinesp">
                <p>We are looking forwad to your value stay at SmatyGrand. <span>Feel at home!</span></p>
          </div>
</div>




















  

 

  


    
  























        </>
     
      
    )
}

export default Reservations