import React from "react";
import { Route, Redirect } from "react-router-dom";

// Check if token exists (simple auth check)
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
