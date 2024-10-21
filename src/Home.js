import React, { Suspense, lazy } from "react"; // Import React and lazy/Suspense for code-splitting
import { Link, Route } from "react-router-dom"; // Import Link and Route for navigation

// Lazy load the components to optimize performance
const About = lazy(() => import("./About"));
const Contacts = lazy(() => import("./Contacts"));

const Home = () => {
  return (
    <>
      <div>
        {/* Navigation section with links to different pages */}
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
          </ul>
        </nav>

        {/* Content section */}
        <div>
          <h1>
            Welcome to Smarty Grand Hotel! This is where your imaginations meet
            reality.
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
