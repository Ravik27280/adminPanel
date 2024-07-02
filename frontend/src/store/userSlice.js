// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const response = await axios.post('/api/auth/login', credentials);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token') || null,
    status: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.token = action.payload.token;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
