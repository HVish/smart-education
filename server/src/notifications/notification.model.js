const mongoose = require('mongoose');

const { NotificationType } = require('./notification.contstants');

const { Schema } = mongoose;

const audienceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
});

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    type: {
      type: String,
      enum: NotificationType,
      default: NotificationType.GENERAL,
    },
    extras: {
      type: Schema.Types.Mixed,
      default: {},
    },
    audiences: {
      type: [audienceSchema],
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  },
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Notification };
