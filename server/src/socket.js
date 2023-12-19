const { Server } = require('socket.io');
const cookie = require('cookie');

const { verifyToken } = require('./utils/jwt');

/** @type {Server|undefined} */
let socket = undefined;

function authenticated(req) {
  if (!req.headers.cookie) return false;
  const cookies = cookie.parse(req.headers.cookie);
  const token = cookies.jwt;
  if (!token) return false;
  try {
    return verifyToken(token);
  } catch (error) {
    return false;
  }
}

function initWS(server) {
  if (!socket) {
    socket = new Server(server);
    socket.use((socket, next) => {
      const user = authenticated(socket.handshake);
      if (user) {
        socket.data = user;
        next();
      } else {
        next(new Error('Unauthenticated'));
      }
    });
    socket.on('connection', socket => {
      if (socket.data) {
        const userId = socket.data.userId;
        console.log('joing user to user-topic')
        socket.join(userId);
      }
      console.log('a user connected on websocket', socket.data);
    });
    socket.on('error', error => {
      console.error(error);
    });
  }
  return socket;
}

module.exports = {
  initWS,
  getSocket() {
    return socket;
  },
};
