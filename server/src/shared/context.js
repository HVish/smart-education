const { getSocket } = require('../socket');

function createAppContext(req) {
  return {
    user: req.user,
    socket: getSocket(),
  };
}

module.exports = { createAppContext };
