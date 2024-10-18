import React, { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

const NotificationBell = () => {
  const { notifications, markAsRead } = useContext(NotificationContext);

  return (
    <div>
      <span>🔔 {notifications.length}</span>
      {notifications.length > 0 && (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              {notification.content}
              <button onClick={() => markAsRead(notification._id)}>
                Mark as read
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationBell;
