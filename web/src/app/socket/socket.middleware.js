import io from 'socket.io-client';

import { connectSocket, disconnectSocket } from './socket.action';
import { addNotification } from '../notifications/notification.action';

const socketMiddleware = () => {
  let socket = null;

  return (store) => (next) => (action) => {
    switch (action.type) {
      case connectSocket.toString():
        if (!socket) {
          socket = io();

          socket.on('notification', (data) => {
            store.dispatch(addNotification(data));
          });

          // Additional event handlers can be added here
        }
        break;

      case disconnectSocket.toString():
        if (socket) {
          socket.disconnect();
          socket = null;
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
