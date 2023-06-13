import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlAPI } from "../services_api";
const storedUser = localStorage.getItem("user_info");
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  useradmin: parsedUser && parsedUser.username ? parsedUser.username : null,
  error: null,
  token: JSON.parse(localStorage.getItem("user_info")),
  user: null,
  // xem tai khoan nguoi dung da tai hay chua +> de trang false de ve trang thai ban dau
  userLoaded: false,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.useradmin = JSON.parse(localStorage.getItem("user_info")).username;
      state.user = action.payload.user_info;
      state.token = JSON.parse(localStorage.getItem("user_info"));
      state.error = null;
      state.userLoaded = true;
    },
    loginFailure: (state, action) => {
      state.useradmin = null;
      state.error = null;
      state.token = null;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.useradmin = null;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user_info");
      window.location.href = "/"; // Thay đổi URL để thực hiện điều hướng đến trang đăng nhập
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authUserSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${urlAPI}/login/`, {
      email,
      password,
    });
    if (response.status === 200) {
      // lưu thông tin người dùng và localstoage
      localStorage.setItem("user_info", JSON.stringify(response.data));
      const storedUser = localStorage.getItem("user_info");
      if (storedUser) {
        // Đã lưu thông tin người dùng trong localStorage
        const authAdmin = JSON.parse(storedUser);
        const token = authAdmin.token;
        //console.log("login3", authAdmin);
        dispatch(loginSuccess(authAdmin));
       
      }
      dispatch(loginSuccess(response.data));  
      return response.data; // Trả về dữ liệu nếu cần
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

export default authUserSlice.reducer;
