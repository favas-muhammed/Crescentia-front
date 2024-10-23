import React, { createContext, useState, useContext, useEffect } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      // Fetch user data
      fetchUserData();
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setToken(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setToken(null);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
