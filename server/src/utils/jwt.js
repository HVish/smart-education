const jwt = require('jsonwebtoken');
const { config } = require('../config');

function generateToken({ _id: userId, email, name, photo, role }) {
  return jwt.sign({ userId, email, name, photo, role }, config.jwtSecret, { expiresIn: '1h' });
}

function verifyToken(token) {
  const decoded = jwt.verify(token, config.jwtSecret);
  return decoded;
}

module.exports = {
  generateToken,
  verifyToken,
};
