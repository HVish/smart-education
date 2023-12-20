import { api } from 'src/utils/api';

export async function fetchMyNotifications() {
  const response = await api.get('/notifications');
  return response.data;
}

export async function markNotificationAsSeen({ notificationId }) {
  const response = await api.patch(`/notifications/${notificationId}/seen`);
  return response.data;
}

export async function markAllNotificationsAsSeen() {
  const response = await api.patch('/notifications/seen');
  return response.data;
}
