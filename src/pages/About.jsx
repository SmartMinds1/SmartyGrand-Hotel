import GigsawImgs from "../components/GigsawImgs";
import "../styles/About.css";
import TextBox from "../components/TextBox";
import Graph from "../assets/hotel_growth_graph.png";
import CheckBox from "../components/CheckBox";

const About = () => {
    return(
        <div>

{/*.....................FIRST SECTION ...................*/}
        <div className="aboutSection1">
                <div className="aboutHighlights urbanist">
                  <div className="urbanist">
                    <p className="abt_Us">| About Us</p>
                    <ul>
                        <li>Quality Services</li>
                        <li>An exeptional Discounts</li>
                        <li>Realiable</li>
                        <li>Friendly</li>
                        <li>Secure</li>
                    </ul>
                  </div>
                    <p className="highlightsCaption">Visit us today and explore more... <br /> Don't wait to here from <br /> friends!</p>
                </div>
                <div className="aboutGigImages">
                    <GigsawImgs />
                </div>
        </div>
           

{/*.....................SECOND SECTION ...................*/}
        <div className="aboutSection2">
                <div className="aboutTextBoxContainer">
                    <h1><span>Your ultimate</span> destination for luxury and tranquility! </h1>
                    <TextBox className="aboutMessage TextDesign">
                            <p>Nestled amidst the bustling energy of the city, 
                            our hotel offers a serene escape where modern elegance
                            meets African charm. we pride ourselves on delivering an
                            unparalleled guest experience.
                            </p>
                    </TextBox>
                </div>
            
                <figure>
                        <img src={Graph} alt="hotelGraph" width="400" height="300"/>
                        <figcaption className="graphCaption">Top ranked countrywide</figcaption>
                </figure>
        </div>  





{/*.....................THIRD SECTION ...................*/}
            <div className="aboutSection3">
                    <CheckBox>
                    <h1>Trusted globally for our hospitality</h1>
                    </CheckBox>
                    <TextBox className="aboutTrustMessage TextDesign">
                    <p>We've been acepted countrywide as the best 5 star hotel.
                        Our services are unmatched! A world where luxury meets 
                        authenticity, and every detail is designed to delight.
                        Your unforgettable escape in Nairobi begins here.
                    </p>
                    </TextBox>
            </div>



{/*.....................FOURTH SECTION ...................*/}
        <div className="aboutSection4">
            <p className="abt_Us our_services">| Our services</p>

            <h2 className="our_services_intro urbanist">What Are We <span>Best Known For?</span></h2>

            <div className="aboutTextBoxContainer">
                <CheckBox>
                <h1>Accommodation</h1>
                </CheckBox>
                <TextBox className="ServicesMessage overFlowDesign TextDesign">
                <p>Step into serenity and sophistication with our Sanctuary Deluxe Rooms where every detail is crafted to elevate your experience.Our Honeymoon Suites are designed with love in mind, where every corner whispers of intimacy and luxury. Family rooms that offer spacious layouts and modern amenities ensuring a comfortable and memorable family vacation.
                </p>
                </TextBox>
            </div>
           

            <div className="aboutTextBoxContainer">
                <CheckBox>
                <h1>Premier Conference Event Solutions</h1>
                </CheckBox>
                <TextBox className="ServicesMessage overFlowDesign TextDesign">
                <p>Ideal for corporate events, our Conference Package at Smarty Grand Hotel offers a fully equipped meeting hall, customized catering services, state-of-the-art audio-visual equipment, and luxurious accommodation for your attendees. Enjoy the convenience of high-speed internet, a dedicated event coordinator, and complimentary access to our business center. Focus on your business objectives while we handle all the logistics, ensuring a seamless and productive event.
                </p>
                </TextBox>
            </div>

           {/*  Repeating aboutTextBoxContainer2 and 3 since the layours are the same */}
            <div className="aboutTextBoxContainer">
                <CheckBox>
                <h1>Culinary Delights</h1>
                </CheckBox>
                <TextBox className="ServicesMessage overFlowDesign TextDesign">
                <p>Embark on a culinary journey with our world-class dining options. Our talented chefs craft exquisite dishes using the finest locally sourced ingredients, offering everything from gourmet international cuisine to authentic Kenyan specialties. Whether you're enjoying a lavish breakfast buffet, a relaxing lunch by the pool, or an intimate dinner in our elegant restaurant, every meal at Smarty Grand Hotel is a celebration of flavor.
                </p>
                </TextBox>
            </div>
           

            <div className="aboutTextBoxContainer">
                <CheckBox>
                <h1>SPA Retreats</h1>
                </CheckBox>
                <TextBox className="ServicesMessage overFlowDesign TextDesign">
                <p> Each day, pamper yourself with a selection of luxurious spa treatments tailored to soothe your body and soul, leaving you feeling refreshed and revitalized. With full access to our wellness facilities, including sauna, steam room, and fitness center, embark on a journey of wellness and self-discovery. Surrender to the healing touch of our skilled therapists and discover a sanctuary of inner peace and harmony.
                </p>
                </TextBox>
            </div>

           {/*  Repeating aboutTextBoxContainer2 and 3 since the layours are the same */}
            <div className="aboutTextBoxContainer">
                <CheckBox>
                <h1>Adventure and Exploration</h1>
                </CheckBox>
                <TextBox className="ServicesMessage overFlowDesign TextDesign">
                <p>Adventure and natural beauty of Kenya. Venture out on a safari to experience the majestic wildlife, visit the nearby Nairobi National Park, or explore the vibrant markets and museums in the city. Our concierge team is always available to help you plan unforgettable excursions and adventures.
                </p>
                </TextBox>
            </div>

            <div className="aboutTextBoxContainer">
                <CheckBox>
                <h1>Unmatched Service and Hospitality</h1>
                </CheckBox>
                <TextBox className="ServicesMessage overFlowDesign TextDesign">
                <p> From the moment you arrive, our friendly and attentive staff will cater to your every need, ensuring a seamless and memorable stay. We offer personalized check-ins, bespoke recommendations for local attractions, and a range of tailored services to enhance your experience.
                </p>
                </TextBox>
            </div>      
   </div>

            <h1 className="finalAboutComment">| We look forward to welcoming you and making your stay with us truly exceptional.</h1>


</div>
        
    );
};

export default About;
