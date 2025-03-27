import "./Chatform.css";
import React from "react";
import Button from "./Button";

//user form UI
const Chatform = ({ handleChange, formData}) => {
  return (
//main div
<div className="Chatform">
    <div className="chatFormCaption">
          <h1>One call away!</h1>
    </div>
    
{/* //chat form */}
  <form action="">
      <div className="formtable">
        <div className="Insidetable">
          <input
            type="text"
            name="username"
            id="username"
            size="20"
            placeholder="username"
            autoComplete="on"
            required
            /*   value={formData.name} */
            onChange={handleChange}
          />

          <div className="inputDivHr1"></div>
        </div>

        <div className="Insidetable">
          <input
            size="20"
            autoComplete="on"
            type="email"
            id="email"
            name="email"
            /*  value={formData.email} */
            onChange={handleChange}
            required
            placeholder="Email"
          />
        </div>
        <div className="inputDivHr2"></div>

        <textarea 
            className='textArea'
            id="message"
            name="message"
            value={formData}
            onChange={handleChange}
            required
            placeholder='Your Message'
            rows="10"
            cols="40"
        />

        <Button  type="submit" btnLabel="Submit"/> 

       </div>
            
    </form>
 
 </div>
  );
};

export default Chatform;
