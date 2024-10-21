import React, { useState, lazy, Suspense } from "react"; // Import lazy and Suspense for code-splitting
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router, Route, and Routes for navigation
import "./App.css";
import Header from "./Header"; // Header component
import Footer from "./Footer"; // Footer component

// Lazy load components
const Home = lazy(() => import("./Home")); // Home component
const About = lazy(() => import("./About")); // About component
const Contacts = lazy(() => import("./Contacts")); // Contacts component
const SignUp = lazy(() => import("./signUp")); // SignUp component
const SignIn = lazy(() => import("./signIn")); // SignIn component

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9YqbqA8pEmlud9EF01pz5wf43Olj44s0",
  authDomain: "smartygrandhotel-e5549.firebaseapp.com",
  projectId: "smartygrandhotel-e5549",
  storageBucket: "smartygrandhotel-e5549.appspot.com",
  messagingSenderId: "148128605581",
  appId: "1:148128605581:web:6dcaef33f9ce9409ef49c4",
  measurementId: "G-4F70FGE44N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDb = getFirestore(app);

function App() {
  const [reqType, setReqType] = useState("");
  const [newUser, setNewUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Function to create a new user account in Firebase
  const userSignUp = async (newUser, userEmail, userPassword) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;

      // Store user data in Firestore after account creation
      await setDoc(doc(fireDb, "users", user.uid), {
        username: newUser,
        email: userEmail,
        uid: user.uid,
        role: "user",
      });

      alert(
        `SUCCESSFUL! Dear ${newUser}, your account has been created! You can now sign in.`
      );
      setNewUser("");
      setUserEmail("");
      setUserPassword("");

      // Navigate to Home after successful sign-up
      navigate("/home");
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email address is already in use.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Sign-up is currently disabled.";
          break;
        case "auth/weak-password":
          errorMessage = "Your password is too weak.";
          break;
        default:
          errorMessage = "Internet connection failure! Try again later.";
          break;
      }
      alert(errorMessage);
    }
  };

  const handleUserSignUp = (e) => {
    e.preventDefault();
    if (!newUser || !userEmail || !userPassword) {
      alert("Complete missing fields!");
      return;
    }
    userSignUp(newUser, userEmail, userPassword);
  };

  return (
    <Router>
      <div className="App">
        <Header title="Smarty Grand Hotel" />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route
              path="/signup"
              element={
                <SignUp
                  handleUserSignUp={handleUserSignUp}
                  setNewUser={setNewUser}
                  setUserEmail={setUserEmail}
                  setUserPassword={setUserPassword}
                />
              }
            />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
