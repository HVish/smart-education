const z = require('zod');
const { NotificationType } = require('../notification.contstants');

const createNotificationDto = z.object({
  title: z.string(),
  description: z.string(),
  avatar: z.string().optional(),
  type: z.nativeEnum(NotificationType),
  extras: z.record(z.any()).optional(),
  audiences: z.array(
    z.object({
      userId: z.string(),
    }),
  ),
});

module.exports = { createNotificationDto };
