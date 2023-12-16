const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');

const { authenticate } = require('../shared/authenticate.middleware');
const { validate } = require('../shared/validate.middleware');
const { createAppContext } = require('../shared/context');
const { createUserDto } = require('./dto/create-user.dto');
const { updateUserDto } = require('./dto/update-user.dto');
const { updateUser, createUser } = require('./user.service');

const userRoutes = Router();

userRoutes.post('/', validate({ body: createUserDto }), async (req, res, next) => {
  try {
    const context = createAppContext(req);
    const result = await createUser(context, req.body);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
});

userRoutes.get('/profile', authenticate, (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    next(new UnauthorizedError('Unauthorized'));
  }
});

userRoutes.patch('/', authenticate, validate({ body: updateUserDto }), async (req, res, next) => {
  try {
    const context = createAppContext(req);
    const result = await updateUser(context, req.body);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = { userRoutes };
