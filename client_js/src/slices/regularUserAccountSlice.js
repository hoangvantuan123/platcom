import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { urlAPI } from "../services_api";

// Action creator để tạo người dùng mới
export const createUser = createAsyncThunk('regularUser/createUser', async (formData) => {
  try {
    const response = await axios.post(`${urlAPI}/register/`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Khai báo initialState cho reducer
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Khai báo reducer
const regularUserSlice = createSlice({
  name: 'regularUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export reducer
export default regularUserSlice.reducer;
