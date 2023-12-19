const { Router } = require('express');

const { authenticate } = require('../shared/authenticate.middleware');
const { validate } = require('../shared/validate.middleware');
const { createAppContext } = require('../shared/context');
const { createNotificationDto } = require('./dto/create-notification.dto');
const { createNotification, getMyNotifications, markAllAsSeen, markAsSeen } = require('./notification.service');

const notificationRoutes = Router();

notificationRoutes.post('/', authenticate, validate({ body: createNotificationDto }), async (req, res, next) => {
  try {
    const context = createAppContext(req);
    const notification = await createNotification(context, req.body);
    return res.json(notification);
  } catch (error) {
    next(error);
  }
});

notificationRoutes.get('/', authenticate, async (req, res, next) => {
  try {
    const context = createAppContext(req);
    const notifications = await getMyNotifications(context);
    return res.json(notifications);
  } catch (error) {
    next(error);
  }
});

notificationRoutes.patch('/seen', authenticate, async (req, res, next) => {
  try {
    const context = createAppContext(req);
    const notifications = await markAllAsSeen(context);
    return res.json(notifications);
  } catch (error) {
    next(error);
  }
});

notificationRoutes.patch('/:notificationId/seen', authenticate, async (req, res, next) => {
  try {
    const context = createAppContext(req);
    const notification = await markAsSeen(context, req.params.notificationId);
    return res.json(notification);
  } catch (error) {
    next(error);
  }
});

module.exports = { notificationRoutes };
