import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
