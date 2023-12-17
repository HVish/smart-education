import { createSelector } from '@reduxjs/toolkit';

console.log('selector');

export const authSelector = (state) => state?.auth;

export const selectProfile = createSelector(authSelector, (state) => state?.profile);
