import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './notification.api';

export const addNotification = createAction('notifications/add');

export const fetchMyNotifications = createAsyncThunk(
  'notifications/fetchMyNotifications',
  async () => {
    const result = await api.fetchMyNotifications();
    return result;
  }
);

export const markNotificationAsSeen = createAsyncThunk(
  'notifications/markNotificationAsSeen',
  async ({ notificationId }) => {
    const result = await api.markNotificationAsSeen({ notificationId });
    return result;
  }
);

export const markAllNotificationsAsSeen = createAsyncThunk(
  'notifications/markAllNotificationsAsSeen',
  async () => {
    await api.markAllNotificationsAsSeen();
  }
);
