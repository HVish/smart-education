const { Router } = require('express');

const { createAppContext } = require('../shared/context');
const { validate } = require('../shared/validate.middleware');
const { loginUserDto } = require('./dto/login-user.dto');
const { loginUser } = require('./auth.service');

const authRoutes = Router();

authRoutes.post('/login', validate({ body: loginUserDto }), async (req, res, next) => {
  try {
    const context = createAppContext(req);
    const { token, profile } = await loginUser(context, req.body);
    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000), // expire in 1 hour
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
});

module.exports = { authRoutes };
