import "./Header.css";
import { Link } from "react-router-dom";

//creating the header function
//PROPS EXAMPLE
const Header = ({ title }) => {
  return (
    <div className="Head">
      <div className="navBar">
        <h1 className="headerTitle">
          <span>Smarty</span>Grand
        </h1>
        <div className="navPages">
          <nav>
            <ul className="navListDesign">
              <li>
                <Link className="linkStyle" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="linkStyle" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="linkStyle" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="linkStyle" to="/admin">
                  Reservation
                </Link>
              </li>
              <li>
                <Link className="linkStyle" to="/admin">
                  blog
                </Link>
              </li>
              <li>
                <Link className="linkStyle" to="/admin">
                  Admin
                </Link>
              </li>
            </ul>
          </nav>

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
