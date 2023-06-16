import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlAPI } from "../services_api";
import { isExpired, decodeToken } from "react-jwt";

const getDecodedToken = () => {
  const datatoken = JSON.parse(localStorage.getItem("user_info"))?.token;
  if (datatoken) {
    const myDecodedToken = decodeToken(datatoken);
    const isMyTokenExpired = isExpired(datatoken);
    console.log('decodedToken', myDecodedToken);
    return { myDecodedToken, isMyTokenExpired };
  } else {
    // Handle the case when the token is null
    console.log('Token is null');
    return { myDecodedToken: null, isMyTokenExpired: false };
  }
};
const decodedToken = getDecodedToken().myDecodedToken;
const email = decodedToken ? decodedToken.email : null;

const initialState = {
  useradmin: decodedToken ? decodedToken.username : null,
  error: null,
  token: JSON.parse(localStorage.getItem("user_info"))?.token || null,
  user: null,
  email: email,
  userLoaded: false,
  data: null,
  dataToken: decodedToken || null,
};

const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    
    loginSuccess: (state, action) => {
      const { username, token } = action.payload;
      state.useradmin = username;
      state.user = username;
      state.token = token;
      state.error = null;
      state.userLoaded = true;
      window.location.href = "/admin-panel/home";
    },
    loginFailure: (state, action) => {
      state.useradmin = null;
      state.error = action.payload.error;
      state.token = null;
      state.userLoaded = false;
    },
    logout: (state) => {
      state.useradmin = null;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user_info");
      window.location.href = "/admin/admin-panel/login";
    },
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
      // Xử lý dữ liệu khi nhận được từ server
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload.error;
    },
  },
  
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  fetchDataSuccess,
  fetchDataFailure,
} = authAdminSlice.actions;

export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${urlAPI}/accounts/login/`, {
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

export const fetchData = createAsyncThunk(
  "authAdmin/getAuthAdmin",
  async () => {
    try {
      const response = await axios.get(`${urlAPI}/accounts/login/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
// Tự động gọi hàm sendDataToBackend khi khởi tạo slice
export default authAdminSlice.reducer;
