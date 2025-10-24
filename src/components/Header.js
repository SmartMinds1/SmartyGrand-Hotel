import "./Header.css";
import { Link } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import Modal from "./popUps/Modal";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { verifyAccessToken } from "../utils/authHelper";

import { useNavigate } from "react-router-dom";

//PROPS EXAMPLE
const Header = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState("");

  //setting up toggle button to show mobile nav bar
  const [showContent, setShowContent] = useState(false);
  const handleToggle = () => {
    setShowContent((prev) => !prev);
  };

  //hadling switch to signIn
  const handleSwitchToSignIn = (message) => {
    setShowSignUp(false);
    setSignUpMessage(message);
    setShowSignIn(true);
  };

  //hadling switch to signUp
  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  //hadling switch to forgot password
  const handleSwitchToForgotPassword = () => {
    setShowSignIn(false);
    setShowForgotPass(true);
  };

  const navigate = useNavigate();

  const handleAdminAccess = async () => {
    const isAuthenticated = await verifyAccessToken();

    if (isAuthenticated) {
      // Already logged in, go straight to dashboard
      navigate("/admin-dashboard");
    } else {
      // Not logged in, show Sign In modal
      setShowSignIn(true);
    }
  };

  //animating my header on scroll
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
    <>
      <div className={`header ${isVisible ? "visible" : "hidden"}`}>
        <div className="navBar">
          <h1 className="headerTitle">
            <span>Smarty</span>Grand
          </h1>

          <button
            className="dashboard-icon"
            onClick={handleToggle}
            aria-label="Toggle Content"
          >
            {showContent ? <span>✕</span> : <span>&#9776;</span>}
          </button>

          {/*  setting up bar for mobile and tablets */}
          <div>
            {showContent && (
              <div className="mobileNavBar">
                {/* auth list for mobile */}
                <ul className="mobileAuthNav">
                  <li
                    onClick={() => {
                      setShowSignIn(true);
                      setShowContent(false);
                    }}
                  >
                    Sign In
                  </li>
                  <li
                    onClick={() => {
                      setShowSignUp(true);
                      setShowContent(false);
                    }}
                  >
                    Sign Up
                  </li>
                </ul>

                {/* nav list for mobile */}
                <ul className="mobileNavList">
                  <li onClick={() => setShowContent(false)}>
                    <Link className="linkStyle" to="/">
                      Home
                    </Link>
                  </li>
                  <li onClick={() => setShowContent(false)}>
                    <Link className="linkStyle" to="/contact">
                      Contact
                    </Link>
                  </li>
                  <li onClick={() => setShowContent(false)}>
                    <Link className="linkStyle" to="/about">
                      About
                    </Link>
                  </li>
                  <li onClick={() => setShowContent(false)}>
                    <Link className="linkStyle" to="/reservations">
                      Reservation
                    </Link>
                  </li>

                  <li
                    className="linkStyle"
                    onClick={() => {
                      handleAdminAccess();
                      setShowContent(false);
                    }}
                  >
                    Admin
                  </li>
                </ul>
              </div>
            )}
          </div>

          {
            <div className="navPages">
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

                <li className="linkStyle" onClick={handleAdminAccess}>
                  Admin
                </li>
              </ul>
            </div>
          }

          <div className="authSection">
            <div className="authIcons">
              <FontAwesomeIcon icon={faUser} className="authIcon" />
              <FontAwesomeIcon icon={faAngleDown} className="authDropIcon" />
            </div>

            <ul className="auth-links">
              <li
                onClick={() => {
                  setShowSignIn(true);
                  setShowSignUp(false);
                }}
              >
                Sign In
              </li>
              <li
                onClick={() => {
                  setShowSignUp(true);
                  setShowSignIn(false);
                }}
              >
                Sign Up
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* showing login popUp */}
      {showSignIn && (
        <Modal isOpen={showSignIn} onClose={() => setShowSignIn(false)}>
          {/*Any popUP right here */}
          <SignIn
            signUpResponse={signUpMessage}
            closeSignIn={() => setShowSignIn(false)}
            onForgotPass={() => handleSwitchToForgotPassword()}
            onDontHaveAccount={() => handleSwitchToSignUp()}
          />
        </Modal>
      )}

      {/* showing signUp popUp */}
      {showSignUp && (
        <Modal isOpen={showSignUp} onClose={() => setShowSignUp(false)}>
          {/* Any popUP right here */}
          <SignUp
            onSuccess={handleSwitchToSignIn}
            closeSignUp={() => setShowSignUp(false)}
          />
        </Modal>
      )}

      {/* showing forgotPassword popUp */}
      {showForgotPass && (
        <Modal isOpen={showForgotPass} onClose={() => setShowForgotPass(false)}>
          {/*Any popUP right here */}
          <ForgotPassword closeForgotPass={() => setShowForgotPass(false)} />
        </Modal>
      )}
    </>
  );
};

export default Header;
