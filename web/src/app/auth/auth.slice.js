import { createSlice } from '@reduxjs/toolkit';

import { setProfile } from './auth.action';

let profile = null;

try {
  const str = window.localStorage.getItem('profile');
  profile = JSON.parse(str);
} catch (error) {
  console.error(error);
}

const initialState = {
  profile,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setProfile, (state, action) => {
      state.profile = action.payload;
    });
  },
});
