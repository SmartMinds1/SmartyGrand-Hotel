 import React, {useState} from "react";
import BookImgDesign from "./BookImgDesign";
import Button from "./Button";
import './RoomsHolder.css';
import PayPopUp from "./PayPopUp";
 
 
 const RoomsHolder = ()=>{

    const [showPopup, setShowPopup] = useState(false);



    return(
<div className="roomImagesContainer">
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

                        <Button type="submit"   onClick={() => setShowPopup(true)} btnLabel="Book Now"/>
                       {/*  This displays the popUp */}
                        {showPopup && <PayPopUp Amount="150" title="City View" onClose={() => setShowPopup(false)} />}
                    </BookImgDesign>
                </div>
                

                <div className="bookImgContainer duluxe2">
                    <BookImgDesign className="roomDetails">
                        <h4>Garden View</h4>
                        <ul>
                            <li>Plush king-size bed</li>
                            <li>High-speed Wi-Fi</li>
                            <li>43' smart-TV</li>
                            <li>Spacious work desk</li>
                            <li>En-suite bathroom</li>
                            <li>24-hour room service</li>
                        </ul>
                       <Button type="submit"   onClick={() => setShowPopup(true)} btnLabel="Book Now"/>
                       {/*  This displays the popUp */}
                        {showPopup && <PayPopUp Amount="200" title="Garden View" onClose={() => setShowPopup(false)} />}
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
                        <Button type="submit"   onClick={() => setShowPopup(true)} btnLabel="Book Now"/>
                       {/*  This displays the popUp */}
                        {showPopup && <PayPopUp Amount="250" title="Balcony Gaze" onClose={() => setShowPopup(false)} />}
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
                       <Button type="submit"   onClick={() => setShowPopup(true)} btnLabel="Book Now"/>
                       {/*  This displays the popUp */}
                        {showPopup && <PayPopUp Amount="300" title="Mountain View" onClose={() => setShowPopup(false)} />}
                    </BookImgDesign>
                </div>     
       </div>
    )
 }

 export default RoomsHolder
 
 