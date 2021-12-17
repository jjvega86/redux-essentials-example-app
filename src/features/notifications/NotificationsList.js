import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import classNames from "classnames";

import { selectAllUsers } from "../users/usersSlice";
import {
  useGetNotificationsQuery,
  allNotificationsRead,
  selectMetadataEntities,
} from "./notificationsSlice";

export const NotificationsList = () => {
  const dispatch = useDispatch();
  const { data: notifications = [] } = useGetNotificationsQuery();
  const notificationsMetadata = useSelector(selectMetadataEntities);
  const users = useSelector(selectAllUsers);

  useLayoutEffect(() => {
    dispatch(allNotificationsRead());
  });

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown User",
    };

    const metadata = notificationsMetadata[notification.id];

    // classNames is a utility library used to more easily concatenate classnames for conditional rendering
    // Here, we are checking each notification's isNew property for true or false
    // If true, .new is added to the class name
    const notificationClassName = classNames("notification", {
      new: metadata.isNew,
    });

    return (
      <div key={notification.id} className={notificationClassName}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};
