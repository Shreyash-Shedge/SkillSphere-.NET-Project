import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    role: null,
    name : null
  },
  reducers: {
    setAuthData(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;
    },
    clearAuthData(state) {
      state.token = null;
      state.role = null;
      state.name = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
