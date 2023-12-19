const { Server } = require('socket.io');

let socket = undefined;

function initWS(server) {
  if (!socket) {
    socket = new Server(server);
    socket.on('connection', () => {
      console.log('a user connected on websocket');
    });
    socket.on('error', error => {
      console.error(error);
    });
  }
  return socket;
}

module.exports = { initWS, socket };
