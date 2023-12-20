import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './auth.api';

export const setProfile = createAction('auth/setProfile');

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, email, password, role }, { dispatch }) => {
    const profile = await api.signupUser({ name, email, password, role });
    window.localStorage.setItem('profile', JSON.stringify(profile));
    dispatch(setProfile(profile));
    return profile;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { dispatch }) => {
    const profile = await api.loginUser({ email, password });
    window.localStorage.setItem('profile', JSON.stringify(profile));
    dispatch(setProfile(profile));
    return profile;
  }
);

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { dispatch }) => {
  const profile = await api.getProfile();
  window.localStorage.setItem('profile', JSON.stringify(profile));
  dispatch(setProfile(profile));
  return profile;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  await api.logoutUser();
  dispatch(setProfile(null));
  window.localStorage.clear();
});
