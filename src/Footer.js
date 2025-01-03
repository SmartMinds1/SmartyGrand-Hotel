import "./Footer.css";
import ContentBox from "./ContentBox";
import SocialIcons from "./SocialIcons";

//craeting the footer functions
const Footer = () => {
  const copyrightdate = new Date();

  return (
    <div className="Footer">
      <div className="FooterHr"></div>
      <div className="FooterItems">
        <ContentBox className="contactsBox">
          <h1>Contact Us</h1>
          <div className="contentBoxHr"></div>
          <ul className="FooterListDesign">
            <li>smartygrand@infor.co.ke</li>
            <li>Maxland LTD</li>
            <li>Nairobi</li>
            <li>+254-115154402</li>
          </ul>
        </ContentBox>
        <ContentBox className="aboutBox">
          <h1>About</h1>
          <div className="contentBoxHr"></div>
          <ul className="FooterListDesign">
            <li>campany background</li>
            <li>Founders</li>
            <li>Suppliers</li>
            <li>vission</li>
            <li>Mission</li>
            <li>Goals</li>
          </ul>
        </ContentBox>
        <ContentBox className="sponsorsBox">
          <h1>Sponsors</h1>
          <div className="contentBoxHr"></div>
          <ul className="FooterListDesign">
            <li>shareholders</li>
            <li>AJ Ventures</li>
            <li>LG Tech</li>
            <li>Teach2Give</li>
            <li>TechPrenure</li>
            <li>SheCode Africa</li>
          </ul>
        </ContentBox>
        <ContentBox className="socialBox">
          <h1>Social</h1>
          <div className="contentBoxHr"></div>
          <ul className="FooterListDesign">
            <li>Youtube</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Whatsapp</li>
            <li>LinkedIn</li>
            <li>X</li>
          </ul>
        </ContentBox>
        <ContentBox className="supportBox">
          <h1>Support</h1>
          <div className="contentBoxHr"></div>
          <div className="clear"></div>
          <ul className="FooterListDesign">
            <li>Google Community</li>
            <li>SmartMinds Tech</li>
            <li>Hotel support</li>
          </ul>
        </ContentBox>

        <div className="socialIconsBar">
          <SocialIcons />
        </div>
        <div className="FooterCopyrights">
          <p>&copy; {copyrightdate.getFullYear()} smartygrandhotel</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
