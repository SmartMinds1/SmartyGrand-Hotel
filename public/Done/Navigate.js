import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Simulate sign-up verification
    const isVerified = true; // Replace with actual verification logic

    if (isVerified) {
      // Navigate to the About page after verification
      navigate("/about");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <button onClick={handleSignUp}> Submit </button>{" "}
      {/* Call handleSignUp on button click */}
    </div>
  );
};

export default SignUp;
