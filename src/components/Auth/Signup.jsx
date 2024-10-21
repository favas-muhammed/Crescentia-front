// src/components/Auth/SignupForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@thebrandcollector.com")) {
      setError("Only @thebrandcollector.com email addresses are allowed.");
      return;
    }
    try {
      await authService.signup(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;
