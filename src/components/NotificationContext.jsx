// NotificationContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { fetchWithToken } from "./SessionContext";

export const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

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
    const interval = setInterval(fetchNotifications, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await fetchWithToken(`/api/notifications/${notificationId}`, "PUT", {
        isRead: true,
      });
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

export default NotificationContextProvider;
