const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { UserRole } = require('./user.constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    methods: {
      comparePassword: async function (candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
      },
    },
  },
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
