import "./Header.css";

//creating the header function
//PROPS EXAMPLE
const Header = ({ title }) => {
  return (
    <div className="Head">
      {/*  <div className="navTitle">
        <h1>{title}</h1>
      </div> */}
      <div className="navBar">
        <h1 className="headerTitle">SmartyGrand</h1>
        <div className="navPages">
          <ul className="navListDesign">
            <li>Home</li>
            <li>Contacts</li>
            <li>About</li>
            <li>Reservation</li>
          </ul>
          <div className="introhr"></div>
        </div>

        <div className="navProfile"></div>
        <div className="navAcc">
          <ul className="navListDesign">
            <li>login</li>
            <li>singup</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = { title: "Default title" };

export default Header;
