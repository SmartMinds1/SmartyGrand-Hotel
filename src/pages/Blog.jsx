import React from "react";
import StylishBox from "../components/StylishBox";


const Blog = () => {
    return(
        <div>
            <h1>Welcome to the blog page for testing different components</h1>

            
            <div className="homeSection1">
                <p className="why_Us">| Why Us</p>
                <h1 className="h1Text">Where modern elegance meets serene nature!</h1>
               <StylishBox className="homeMessage1 TextDesign">
                    <p>Nestled amidst the bustling energy of the city, 
                       our hotel offers a serene escape where modern elegance
                       meets African charm. we pride ourselves on delivering an
                       unparalleled guest experience.
                    </p>
                    <div className="lightDesign"></div>
                    
               </StylishBox>
          </div>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
}

export default Blog;