import React, { useState, useEffect} from "react";
import '../styles/Reservation.css'
import TextBox from "../components/TextBox";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import PayPopUp from "../components/popUps/PayPopUp";
import BookImgDesign from "../components/BookImgDesign";
import Modal from "../components/popUps/Modal";




const Reservations = ()=>{
  /* create an array of tabs to help in navigation */
  const tabs = ['DELUXE', 'FAMILY', 'CONFERENCE', 'SPA', 'GYM'];
  
  const [activeTab, setActiveTab] = useState('DELUXE');

//Setting up our payment popUp
  const [showModal, setShowModal] = useState(false);
  
//An array of buttons to open the right popUp for each room
  const btns = ["dx1", "dx2","dx3","dx4","fm1", "fm2","fm3","fm4","cf1", "cf2","cf3","cf4","sp1", "sp2","sp3","sp4","gm1", "gm2","gm3","gm4",];
  const [activeBtn, setActiveBtn] = useState("");


//Booking page animation
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

//declaring an array of items
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
          description: 'Modern gym with modern equipments to help you flex and refresh',
          className: 'imageDiv6',
        },
        {
          id: 7,
          name: 'Events Solution',
          description: 'Focus on your business objectives while we handle all the logistics.',
          className: 'imageDiv7',
        },
      ]);



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
                    </div>
                </div>
            ))}
        </div>
    </div>



{/* CAPTION PARAGRAPH */}
    <div className="Section1TextCaption">
               <h1>| Enjoy seemless bookings! create,  
                   <span> unforgettable <br />&nbsp;  memories. </span> 
               </h1>
   
               <TextBox className="contactMessage1 TextDesign">
                       <p>Whether you have questions, special requests, or need help planning your stay, our dedicated team is just a call or email away. Reach out to us anytime—day or—night. Focus on your business objectives while we handle all the logistics.
                       </p>
               </TextBox>
    </div>


</div>



{/*......................... Reserve room SECTION 2....................... */}
  <div className="reserveSection2">

  {/*   SECTION 2 PART 1 */}
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


{/* SECTION 2 PART II  */}

        <div className="roomsHolderMover">
                 {/* Content */}
                    <div className="tab-content">
                
{/* 
                    {btns.map((btn) => (
                          <Button
                              key={btn}
                              onClick={() => setActiveBtn(btn)}
                          
                              >
                              
                          </Button>
                      ))} */}
                      

                  {/* 1. Deluxe Rooms Container */}
                          {activeTab === 'DELUXE' && (
                              <div className="roomImagesContainer">

                                      <div className="bookImgContainer duluxe2">
                                            <BookImgDesign className="roomDetails" Tab={activeTab}>
                                                <h4>Garden View</h4>
                                                <ul>
                                                    <li>Plush king-size bed</li>
                                                    <li>High-speed Wi-Fi</li>
                                                    <li>43' smart-TV</li>
                                                    <li>Spacious work desk</li>
                                                    <li>En-suite bathroom</li>
                                                    <li>24-hour room service</li>
                                                </ul>

                                                <Button type="submit" key={btns[0]} onClick={() => { setShowModal(true);setActiveBtn("dx1");}} btnLabel="Book Now"/>

                                                {activeBtn === "dx1" && (
                                                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                    {/* pass your popUP right here */}
                                                    <PayPopUp Amount="200" title="Garden View" onClose={() => setShowModal(false)}/>
                                                  </Modal>
                                                )}

                                            </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe1">
                                              <BookImgDesign className="roomDetails">
                                                  <h4>City View</h4>
                                                  <ul>
                                                      <li>Plush king-size bed</li>
                                                      <li>High-speed Wi-Fi</li>
                                                      <li>43' smart-TV</li>
                                                      <li>Spacious work desk</li>
                                                      <li>En-suite bathroom</li>
                                                      <li>24-hour room service</li>
                                                  </ul>

                                                  <Button type="submit" key={btns[1]} onClick={() => { setShowModal(true);setActiveBtn("dx2");}} btnLabel="Book Now"/>

                                                  {activeBtn === "dx2" && (
                                                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                      {/* pass your popUP right here */}
                                                      <PayPopUp Amount="150" title="City View" onClose={() => setShowModal(false)}/>
                                                    </Modal>
                                                   )}
                                              </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe3">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Balcony Gaze</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>
                                              <Button type="submit" key={btns[2]} onClick={() => { setShowModal(true);setActiveBtn("dx3");}} btnLabel="Book Now"/>

                                              {activeBtn === "dx3" && (
                                              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                {/* pass your popUP right here */}
                                                <PayPopUp Amount="450" title="Balcony Gaze" onClose={() => setShowModal(false)}/>
                                              </Modal>
                                              )}
                                          </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe4">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Mountain View</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>
                                              <Button type="submit" key={btns[3]} onClick={() => { setShowModal(true);setActiveBtn("dx4");}} btnLabel="Book Now"/>

                                              {activeBtn === "dx4" && (
                                                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                    {/* pass your popUP right here */}
                                                    <PayPopUp Amount="300" title="Mountain View" onClose={() => setShowModal(false)}/>
                                                  </Modal>
                                              )}
                                          </BookImgDesign>
                                      </div>     
                              </div>
                           )}


                  {/* 2. FAMILY Rooms Container */}
                          {activeTab === 'FAMILY' && (
                              <div className="roomImagesContainer">

                                      <div className="bookImgContainer duluxe2">
                                            <BookImgDesign className="roomDetails">
                                                <h4>Family SMALL</h4>
                                                <ul>
                                                    <li>Plush king-size bed</li>
                                                    <li>High-speed Wi-Fi</li>
                                                    <li>43' smart-TV</li>
                                                    <li>Spacious work desk</li>
                                                    <li>En-suite bathroom</li>
                                                    <li>24-hour room service</li>
                                                </ul>
                                           
                                                  <Button type="submit" key={btns[4]} onClick={() => { setShowModal(true);setActiveBtn("fm1");}} btnLabel="Book Now"/>
                                                  {activeBtn === "fm1" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="500" title="Family SMALL" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                            </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe1">
                                              <BookImgDesign className="roomDetails">
                                                  <h4>Family BIG</h4>
                                                  <ul>
                                                      <li>Plush king-size bed</li>
                                                      <li>High-speed Wi-Fi</li>
                                                      <li>43' smart-TV</li>
                                                      <li>Spacious work desk</li>
                                                      <li>En-suite bathroom</li>
                                                      <li>24-hour room service</li>
                                                  </ul>

                                                  <Button type="submit" key={btns[5]} onClick={() => { setShowModal(true);setActiveBtn("fm1");}} btnLabel="Book Now"/>
                                                  {activeBtn === "fm1" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="800" title="Family BIG" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}
                                              </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe3">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Family Medium</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>
                                           
                                              <Button type="submit" key={btns[6]} onClick={() => { setShowModal(true);setActiveBtn("fm3");}} btnLabel="Book Now"/>
                                              {activeBtn === "fm3" && (
                                                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                    {/* pass your popUP right here */}
                                                    <PayPopUp Amount="600" title="Family Medium" onClose={() => setShowModal(false)}/>
                                                  </Modal>
                                              )}
                                          </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe4">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Family Classic</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>

                                                  <Button type="submit" key={btns[7]} onClick={() => { setShowModal(true);setActiveBtn("fm4");}} btnLabel="Book Now"/>
                                                  {activeBtn === "fm4" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="1000" title="Family Classic" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                          </BookImgDesign>
                                      </div>     
                              </div>
                           )}


                  {/* 3. CONFFERENCE Rooms Container */}
                          {activeTab === 'CONFERENCE' && (
                              <div className="roomImagesContainer">

                                       <div className="bookImgContainer duluxe2">
                                            <BookImgDesign className="roomDetails">
                                                <h4>Medium Hall</h4>
                                                <ul>
                                                    <li>Plush king-size bed</li>
                                                    <li>High-speed Wi-Fi</li>
                                                    <li>43' smart-TV</li>
                                                    <li>Spacious work desk</li>
                                                    <li>En-suite bathroom</li>
                                                    <li>24-hour room service</li>
                                                </ul>

                                                  <Button type="submit" key={btns[8]} onClick={() => { setShowModal(true);setActiveBtn("cf1");}} btnLabel="Book Now"/>
                                                  {activeBtn === "cf1" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="1000" title="Medum Hall" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                            </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe1">
                                              <BookImgDesign className="roomDetails">
                                                  <h4>Mega Hall</h4>
                                                  <ul>
                                                      <li>Plush king-size bed</li>
                                                      <li>High-speed Wi-Fi</li>
                                                      <li>43' smart-TV</li>
                                                      <li>Spacious work desk</li>
                                                      <li>En-suite bathroom</li>
                                                      <li>24-hour room service</li>
                                                  </ul>

                                                  <Button type="submit" key={btns[9]} onClick={() => { setShowModal(true);setActiveBtn("cf2");}} btnLabel="Book Now"/>
                                                  {activeBtn === "cf2" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="4000" title="Mega Hall" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                              </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe3">
                                          <BookImgDesign className="roomDetails">
                                              <h4>small meeting room</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>

                                              <Button type="submit" key={btns[10]} onClick={() => { setShowModal(true);setActiveBtn("cf3");}} btnLabel="Book Now"/>
                                              {activeBtn === "cf3" && (
                                                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                    {/* pass your popUP right here */}
                                                    <PayPopUp Amount="900" title="small meeting room" onClose={() => setShowModal(false)}/>
                                                  </Modal>
                                              )}

                                          </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe4">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Classic Board Room</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>
                                            
                                              <Button type="submit" key={btns[11]} onClick={() => { setShowModal(true);setActiveBtn("cf4");}} btnLabel="Book Now"/>
                                              {activeBtn === "cf4" && (
                                                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                    {/* pass your popUP right here */}
                                                    <PayPopUp Amount="900" title="Classic Board room" onClose={() => setShowModal(false)}/>
                                                  </Modal>
                                              )}

                                          </BookImgDesign>
                                      </div>     

                              </div>
                           )}


                  {/* 4. SPA SERVICES Container */}
                          {activeTab === 'SPA' && (
                              <div className="roomImagesContainer">
                                
                                      <div className="bookImgContainer duluxe2">
                                            <BookImgDesign className="roomDetails">
                                                <h4>body massage</h4>
                                                <ul>
                                                    <li>Plush king-size bed</li>
                                                    <li>High-speed Wi-Fi</li>
                                                    <li>43' smart-TV</li>
                                                    <li>Spacious work desk</li>
                                                    <li>En-suite bathroom</li>
                                                    <li>24-hour room service</li>
                                                </ul>
                                             
                                                  <Button type="submit" key={btns[12]} onClick={() => { setShowModal(true);setActiveBtn("sp1");}} btnLabel="Book Now"/>
                                                  {activeBtn === "sp1" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="1000" title="Full body massage" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                            </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe1">
                                              <BookImgDesign className="roomDetails">
                                                  <h4>Skin Care</h4>
                                                  <ul>
                                                      <li>Plush king-size bed</li>
                                                      <li>High-speed Wi-Fi</li>
                                                      <li>43' smart-TV</li>
                                                      <li>Spacious work desk</li>
                                                      <li>En-suite bathroom</li>
                                                      <li>24-hour room service</li>
                                                  </ul>

                                                  <Button type="submit" key={btns[13]} onClick={() => { setShowModal(true);setActiveBtn("sp2");}} btnLabel="Book Now"/>
                                                  {activeBtn === "sp2" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="2000" title="Skin Care" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                              </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe3">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Nails</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>

                                                  <Button type="submit" key={btns[14]} onClick={() => { setShowModal(true);setActiveBtn("sp3");}} btnLabel="Book Now"/>
                                                  {activeBtn === "sp3" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="2500" title="Manicure & Pedicure" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                          </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe4">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Piercing</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>
                                              
                                              <Button type="submit" key={btns[15]} onClick={() => { setShowModal(true);setActiveBtn("sp4");}} btnLabel="Book Now"/>
                                              {activeBtn === "sp4" && (
                                                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                    {/* pass your popUP right here */}
                                                    <PayPopUp Amount="3000" title="Piercing" onClose={() => setShowModal(false)}/>
                                                  </Modal>
                                              )}

                                          </BookImgDesign>
                                      </div>     
                              </div>
                           )}


                  {/* 5. GYM SERVICES Container */}
                          {activeTab === 'GYM' && (
                              <div className="roomImagesContainer">

                                      <div className="bookImgContainer duluxe2">
                                            <BookImgDesign className="roomDetails">
                                                <h4>Full Day Training</h4>
                                                <ul>
                                                    <li>Plush king-size bed</li>
                                                    <li>High-speed Wi-Fi</li>
                                                    <li>43' smart-TV</li>
                                                    <li>Spacious work desk</li>
                                                    <li>En-suite bathroom</li>
                                                    <li>24-hour room service</li>
                                                </ul>
                                             
                                                  <Button type="submit" key={btns[16]} onClick={() => { setShowModal(true);setActiveBtn("gm1");}} btnLabel="Book Now"/>
                                                  {activeBtn === "gm1" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="2000" title="Full Day Training" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                            </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe1">
                                              <BookImgDesign className="roomDetails">
                                                  <h4>Personal Exercise</h4>
                                                  <ul>
                                                      <li>Plush king-size bed</li>
                                                      <li>High-speed Wi-Fi</li>
                                                      <li>43' smart-TV</li>
                                                      <li>Spacious work desk</li>
                                                      <li>En-suite bathroom</li>
                                                      <li>24-hour room service</li>
                                                  </ul>

                                                  <Button type="submit" key={btns[17]} onClick={() => { setShowModal(true);setActiveBtn("gm2");}} btnLabel="Book Now"/>
                                                  {activeBtn === "gm2" && (
                                                      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                        {/* pass your popUP right here */}
                                                        <PayPopUp Amount="1000" title="Personal Exercise" onClose={() => setShowModal(false)}/>
                                                      </Modal>
                                                  )}

                                              </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe3">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Hourly training</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>

                                              <Button type="submit" key={btns[18]} onClick={() => { setShowModal(true);setActiveBtn("gm3");}} btnLabel="Book Now"/>
                                              {activeBtn === "gm3" && (
                                                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                    {/* pass your popUP right here */}
                                                    <PayPopUp Amount="500" title="Hourly training" onClose={() => setShowModal(false)}/>
                                                  </Modal>
                                              )}

                                          </BookImgDesign>
                                      </div>

                                      <div className="bookImgContainer duluxe4">
                                          <BookImgDesign className="roomDetails">
                                              <h4>Swimming</h4>
                                              <ul>
                                                  <li>Plush king-size bed</li>
                                                  <li>High-speed Wi-Fi</li>
                                                  <li>43' smart-TV</li>
                                                  <li>Spacious work desk</li>
                                                  <li>En-suite bathroom</li>
                                                  <li>24-hour room service</li>
                                              </ul>

                                              <Button type="submit" key={btns[19]} onClick={() => { setShowModal(true);setActiveBtn("gm4");}} btnLabel="Book Now"/>
                                              {activeBtn === "gm4" && (
                                                  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                                    {/* pass your popUP right here */}
                                                    <PayPopUp Amount="800" title="Swimming" onClose={() => setShowModal(false)}/>
                                                  </Modal>
                                              )}

                                          </BookImgDesign>
                                      </div>     

                              </div>
                           )}

               {/*-----------  END OF ALL ROOMS , IMAGES AND DETAILS----------------  */}         
              </div>
           
        </div>

  </div>



{/*......................... Reserve room SECTION 3....................... */}
<div className="reserveSection3">
          <h2 className="slide_right">| Our Booking <span>Guidlines</span></h2>
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