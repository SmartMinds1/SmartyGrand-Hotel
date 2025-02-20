import React, { useState } from "react";
import "./messageMover.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import messages from "./messages"; // Import the sample messages for testing
import testHeadings from "./testHeadings"; //heading samples

const MessageMover = () => {
  //setting up the initial states.
  const [div1Message, setDiv1Message] = useState(messages[2]);
  const [div2Message, setDiv2Message] = useState(messages[1]);
  const [div3Message, setDiv3Message] = useState(messages[0]);

  const [div1Header, setDiv1Header] = useState(testHeadings[2]);
  const [div2Header, setDiv2Header] = useState(testHeadings[1]);
  const [div3Header, setDiv3Header] = useState(testHeadings[0]);
  const [messageIndex, setMessageIndex] = useState(3);
  const [headerIndex, setHeaderIndex] = useState(3);

  const fetchHeader = async (direction) => {
     // Handle looping
    const newIndex = (headerIndex + direction + testHeadings.length) % testHeadings.length;
    setHeaderIndex(newIndex);
    return testHeadings[newIndex];
  };
  const fetchMessage = async (direction) => {
     // Handle looping
    const newIndex = (messageIndex + direction + messages.length) % messages.length;
    setMessageIndex(newIndex);
    return messages[newIndex];
  };

  const handleForwardButtonClick = async () => {
  // Move div1Message to div2, div2Message to div3
    setDiv3Message(div2Message);
    setDiv2Message(div1Message);
    
    //setting up headers
    setDiv3Header(div2Header);
    setDiv2Header(div1Header);

  // Fetch and set the new message for div1
    const newMessage = await fetchMessage(1); // Forward direction
    const newHeader = await fetchHeader(1); // Forward direction
    setDiv1Message(newMessage);
    setDiv1Header(newHeader);

  };

  const handleBackButtonClick = async () => {
  // Move div3Message to div2, div2Message to div1
    setDiv1Message(div2Message);
    setDiv2Message(div3Message);

  //setting up headers
     setDiv1Header(div2Header);
     setDiv2Header(div3Header);

  // Fetch and set the new message for div3
    const newMessage = await fetchMessage(-1); // Backward direction
    const newHeader = await fetchHeader(-1);

    setDiv3Message(newMessage);
    setDiv3Header(newHeader);
    
  };

  return (
    <div className="MessageMover">
      <div className="movingDiv1">
        <h2 className="testimonialHeader">{div1Header || "Waiting for Header..."}</h2>
        <p className="testimonialMessage">{div1Message || "Waiting for message..."}</p>
      </div>

      <div className="movingDiv2">
        <h2 className="testimonialHeader">{div2Header || "Waiting for Header..."}</h2>
        <p className="testimonialMessage">{div2Message || "Waiting for message..."}</p>
      </div>

      <div className="movingDiv3">
        <h2 className="testimonialHeader">{div3Header || "Waiting for Header..."}</h2>
        <p className="testimonialMessage">{div3Message || "Waiting for message..."}</p>
      </div>

      <div className="arrowHeadsContainer">
              <button className="forwadBtn" onClick={handleBackButtonClick}>
                  <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <button className="backBtn" onClick={handleForwardButtonClick}>
                  <FontAwesomeIcon icon={faChevronRight} />
              </button>
       </div>
     
    </div>
  );
};

export default MessageMover;
