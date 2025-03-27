import './payPopUp.css';

const PayPopUp = ({Amount, title, onClose }) => {
  if (!title) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {/* Header */}
            <div className="popup-header urbanist">
                <h2><span>|</span> {title}</h2>
                <button onClick={onClose} className="popup-close-btn">
                  ✕ 
                </button>
            </div>
       {/* payment details and amount */}
            <div className="payMentAmount">
                <p><span>{Amount}$</span> Per Night</p>
                    <p>PAYBILL  : 247247<br />
              &nbsp;   ACC      :  <span>0115154402</span>
                </p>
            </div>

        {/* Payment Form */}
        {/* On submitting the given data, the information should be sent to the database */}
        <form>
          <div className="popup-input-group">
                <label>Paste Mpesa code</label>
                <input
                  type="text"
                  placeholder="OA2025HIUG"
                />
          </div>
          <div className="popup-input-row">
                <div className="popup-input-group">
                  <label>Check-In</label>
                  <input
                    type="text"
                    placeholder="DD/MM"
                  />
                </div>
                <div className="popup-input-group">
                  <label>Check-Out</label>
                  <input
                    type="text"
                    placeholder="DD/MM"
                  />
                </div>
                <div className="popup-input-group">
                  <label>GUESTS</label>
                  <input
                    type="text"
                    placeholder="1, 2, 3 ..."
                  />
                </div>
          </div>
          
          <div className="popup-input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="full name"
            />
          </div>
          <div className="popup-input-row">
              <div className="popup-input-group">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="email"
                />
              </div>
              <div className="popup-input-group">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="phone"
                />
              </div>
          </div>
          <button type="submit" className="popup-submit-btn urbanist">
            Finish Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayPopUp;
