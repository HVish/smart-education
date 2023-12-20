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
    .limit(5)
    .lean();
  return notifications.map(({ audiences, ...notification }) => {
    const user = audiences.find(({ userId: u }) => u.equals(userId));
    return {
      ...notification,
      isSeen: user.isSeen,
    };
  });
}

async function markAsSeen(context, notificationId) {
  const userId = context.user.userId;
  const { audiences: _, ...notification } = await Notification.findByIdAndUpdate(
    notificationId,
    { $set: { 'audiences.$[item].isSeen': true } },
    { arrayFilters: [{ 'item.userId': userId }], new: true },
  ).lean();
  notification.isSeen = true;
  return notification;
}

async function markAllAsSeen(context) {
  const userId = context.user.userId;
  const result = await Notification.updateMany(
    { audiences: { $elemMatch: { userId } } },
    { $set: { 'audiences.$.isSeen': true } },
  );
  return result;
}

module.exports = {
  createNotification,
  getMyNotifications,
  markAsSeen,
  markAllAsSeen,
};
