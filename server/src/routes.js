const { Router } = require('express');

const { authRoutes } = require('./auth/auth.controller');
const { userRoutes } = require('./users/user.controller');

const appRoutes = Router();

appRoutes.use('/auth', authRoutes);
appRoutes.use('/users', userRoutes);

module.exports = { appRoutes };
