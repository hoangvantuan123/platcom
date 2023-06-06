import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { urlAPI } from '../services_api';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    registerUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess: (state) => {
      state.loading = false;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
} = userSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());

    const response = await axios.post(`${urlAPI}/api/register/`, userData);
    console.log(response.data); // In thông tin người dùng đã đăng ký

    dispatch(registerUserSuccess());
    // Tiếp tục xử lý logic hoặc chuyển hướng đến trang khác
  } catch (error) {
    dispatch(registerUserFailure(error.message));
    // Xử lý lỗi nếu cần
  }
};

export default userSlice.reducer;
