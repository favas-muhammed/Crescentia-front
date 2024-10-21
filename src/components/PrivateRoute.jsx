import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(SessionContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
