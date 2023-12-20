import { createSelector } from '@reduxjs/toolkit';

export const notificationsSelector = (state) => state?.notifications;

export const selectAllNotifications = createSelector(
  notificationsSelector,
  (state) => state?.ids.map((id) => state.entities[id]) || []
);

export const selectSeenNotifications = createSelector(selectAllNotifications, (notifications) =>
  notifications.filter((n) => n.isSeen)
);

export const selectUnseenNotifications = createSelector(selectAllNotifications, (notifications) =>
  notifications.filter((n) => !n.isSeen)
);

export const selectUnseenNotificationCount = createSelector(
  selectUnseenNotifications,
  (notifications) => notifications.length
);
