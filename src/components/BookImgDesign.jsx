import React, {useState} from "react";
import './BookImgDesign.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const BookImgDesign = ({children})=>{

//setting up toggle button to displaying roomDetailsBox
    const [showContent, setShowContent] = useState(false);

    const handleToggle = () => {
    setShowContent(prev => !prev);
    };
       

return(
    <div className="bookImgContainer ">
          <button 
            className="arrow-icon"
            onClick={handleToggle} 
            aria-label="Toggle Content"
          >
            <FontAwesomeIcon icon={showContent ? faAngleDown : faAngleUp}/>
          </button>

          {showContent && (
                <div className="roomDetailsBox">
                    {children}
                </div>
          )}
    </div>
    );
}

export default BookImgDesign