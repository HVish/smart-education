import { createSlice } from '@reduxjs/toolkit';

import { adaptor } from './notification.adaptor';
import {
  addNotification,
  fetchMyNotifications,
  markNotificationAsSeen,
  markAllNotificationsAsSeen,
} from './notification.action';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: adaptor.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNotification, (state, action) => {
      adaptor.addOne(state, action.payload);
    });
    builder.addCase(fetchMyNotifications.fulfilled, (state, action) => {
      adaptor.removeAll(state);
      adaptor.setAll(state, action.payload);
    });
    builder.addCase(markNotificationAsSeen.fulfilled, (state, action) => {
      adaptor.updateOne(state, {
        id: action.payload._id,
        changes: action.payload,
      });
    });
    builder.addCase(markAllNotificationsAsSeen.fulfilled, (state) => {
      adaptor.updateMany(
        state,
        state.ids.map((id) => ({ id, changes: { isSeen: true } }))
      );
    });
  },
});
