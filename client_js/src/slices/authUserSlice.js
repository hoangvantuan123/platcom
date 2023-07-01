import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlAPI } from "../services_api";
import { isExpired, decodeToken } from "react-jwt";

// Giải mã token
const getDecodedToken_User = () => {
  const datatoken_user = JSON.parse(localStorage.getItem("user_account_info"))?.token;
  if (datatoken_user) {
    const myDecodedToken = decodeToken(datatoken_user);
    const isMyTokenExpired = isExpired(datatoken_user);
    //console.log('decodedToken', myDecodedToken);
    return { myDecodedToken, isMyTokenExpired };
  } else {
    // Handle the case when the token is null
    console.log("Token is null");
    return { myDecodedToken: null, isMyTokenExpired: false };
  }
};

const decodedToken = getDecodedToken_User().myDecodedToken;
const email = decodedToken ? decodedToken.email : null;

const initialState = {
  useradmin: decodedToken ? decodedToken.database : null,
  error: null,
  token: JSON.parse(localStorage.getItem("user_account_info"))?.token || null,
  user: email,
  // xem tai khoan nguoi dung da tai hay chua +> de trang false de ve trang thai ban dau
  userLoaded: false,
  database: null,
  datatoken_user: decodedToken || null,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { database, token } = action.payload;
      state.useradmin = database;
      state.user = action.payload.user_account_info;
      state.token = token;
      state.error = null;
      state.userLoaded = true;
      window.location.href = "/";
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
      localStorage.removeItem("user_account_info");
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
      localStorage.setItem("user_account_info", JSON.stringify(response.data));
      const storedUser = localStorage.getItem("user_account_info");
      if (storedUser) {
        // Đã lưu thông tin người dùng trong localStorage
        const authUser = JSON.parse(storedUser);
        const token = authUser.token;
        //console.log("login3", authAdmin);
        dispatch(loginSuccess(authUser));
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
