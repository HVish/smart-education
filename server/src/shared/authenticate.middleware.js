const { User } = require('../users/user.model');
const { verifyToken } = require('../utils/jwt');
const { UnauthenticatedError } = require('./errors');

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthenticatedError('JWT verification failed'));
    return;
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    next(new UnauthenticatedError(`JWT verification error: ${error.message}`));
  }
};

module.exports = { authenticate };
