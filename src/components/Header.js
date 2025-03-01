import "./Header.css";
import { Link } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";

//creating the header function
//PROPS EXAMPLE
const Header = () => {
  //animating my header
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0); // Use ref to persist scroll value

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }

      lastScrollY.current = currentScrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${isVisible ? "visible" : "hidden"}`}>
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
                <Link className="linkStyle" to="/reservations">
                  Reservation
                </Link>
              </li>
              <li>
                <Link className="linkStyle" to="/blog">
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

export default Header;
