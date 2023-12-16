const { Router } = require('express');

const { createAppContext } = require('../shared/context');
const { validate } = require('../shared/validate.middleware');
const { loginUserDto } = require('./dto/login-user.dto');
const { loginUser } = require('./auth.service');

const authRoutes = Router();

authRoutes.post('/login', validate({ body: loginUserDto }), async (req, res, next) => {
  try {
    const context = createAppContext(req);
    const token = await loginUser(context, req.body);
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
});

module.exports = { authRoutes };
