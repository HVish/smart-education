import { createAction } from '@reduxjs/toolkit';

export const connectSocket = createAction('socket/connect');
export const disconnectSocket = createAction('socket/disconnect');
