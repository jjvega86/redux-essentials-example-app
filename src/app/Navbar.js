import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchNotificationsWebsocket,
  selectNotificationsMetadata,
  useGetNotificationsQuery,
} from "../features/notifications/notificationsSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  useGetNotificationsQuery();

  const notificationsMetadata = useSelector(selectNotificationsMetadata);
  const numUnreadNotifications = notificationsMetadata.filter(
    (n) => !n.read
  ).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket());
  };

  const createNotificationsBadge = () => {
    if (numUnreadNotifications > 0) {
      return <span className="badge">{numUnreadNotifications}</span>;
    } else {
      return null;
    }
  };

  let notificationsBadge = createNotificationsBadge();

  return (
    <nav>
      <section>
        <h1>JJ's Social Media App</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications {notificationsBadge}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications!
          </button>
        </div>
      </section>
    </nav>
  );
};
