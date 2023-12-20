import { configureStore } from '@reduxjs/toolkit';

import { api } from 'src/utils/api';

import { authSlice } from './auth/auth.slice';
import { setProfile } from './auth/auth.action';
import { notificationsSlice } from './notifications/notification.slice';

console.log('store');

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
});

// api request interceptor to redirect user to login page if a auth error is received
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear user profile data to redirect to login page
      store.dispatch(setProfile(null));
      window.localStorage.clear();
    }
    return Promise.reject(error);
  }
);
