import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { urlAPI } from "../services_api";
const initialState = {
  useradmin: null,
  error: null,
};

const authAminSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.useradmin = action.payload.useradmin;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.useradmin = null;
      state.error = action.payload.error;
    },
  },
});

export const { loginSuccess, loginFailure } = authAminSlice.actions;

export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${urlAPI}/api/login/`, {
      email,
      password,
    });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

export default authAminSlice.reducer;
