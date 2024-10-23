import React from "react";
import { Link } from "react-router-dom";
import Feed from "../components/Feed/Feed";
import { useSession } from "../contexts/SessionContext";

const HomePage = () => {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return (
      <div className="welcome-page">
        <h1>Welcome to Crescentia</h1>
        <p>Please login or signup to continue</p>
        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Feed</h1>
      <Feed />
    </div>
  );
};

export default HomePage;
