const jwt = require('jsonwebtoken');
const { config } = require('../config');

function getProfileData(user) {
  const { _id: userId, email, name, photo, role } = user;
  return { userId, email, name, photo, role };
}

function generateToken(user) {
  return jwt.sign(getProfileData(user), config.jwtSecret, { expiresIn: '1h' });
}

function verifyToken(token) {
  const decoded = jwt.verify(token, config.jwtSecret);
  return decoded;
}

module.exports = {
  getProfileData,
  generateToken,
  verifyToken,
};
