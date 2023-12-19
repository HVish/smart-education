const { Notification } = require('./notification.model');

async function createNotification(context, createNotificationDto) {
  const notification = await Notification.create(createNotificationDto);
  for (const { userId } of notification.audiences) {
    // notify all users
    context.socket?.to(userId.toHexString()).emit(notification);
  }
  return notification;
}

async function getMyNotifications(context) {
  const userId = context.user.userId;
  const notifications = await Notification.find({ audiences: { $elemMatch: { userId } } })
    .sort('-createdAt')
    .limit(5);
  return notifications;
}

async function markAsSeen(context, notificationId) {
  const userId = context.user.userId;
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    { $set: { 'audiences.$[item].isSeen': true } },
    { arrayFilters: [{ 'item.userId': userId }], new: true },
  );
  return notification;
}

async function markAllAsSeen(context) {
  const userId = context.user.userId;
  const notifications = await Notification.updateMany(
    { audiences: { $elemMatch: { userId } } },
    { $set: { 'audiences.$.isSeen': true } },
    { new: true },
  );
  return notifications;
}

module.exports = {
  createNotification,
  getMyNotifications,
  markAsSeen,
  markAllAsSeen,
};
