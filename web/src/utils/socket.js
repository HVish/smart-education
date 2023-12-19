import { io } from 'socket.io-client';

let socket;

export function connectWS({ onConnect, onDisconnect } = {}) {
  if (socket) socket.disconnect();

  socket = io();

  socket.on('connect', () => {
    console.log('websocket connected', socket.id);
    onConnect?.(socket);
  });

  socket.on('disconnect', () => {
    console.log('websocket disconnected');
    onDisconnect?.();
  });
}
