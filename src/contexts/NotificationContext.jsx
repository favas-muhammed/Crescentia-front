import React, { createContext, useState, useEffect, useContext } from "react";
import { SessionContext } from "./SessionContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { fetchWithToken } = useContext(SessionContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await fetchWithToken("/api/notifications");
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
    // Set up a timer to fetch notifications periodically
    /*const timer = setInterval(fetchNotifications, 60000); // Fetch every minute
    return () => clearInterval(timer);*/
  }, [fetchWithToken]);

  const markAsRead = async (notificationId) => {
    try {
      await fetchWithToken(`/api/notifications/${notificationId}/read`, "PUT");
      setNotifications(notifications.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
