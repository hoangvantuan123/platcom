import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { urlAPI } from "../services_api";

export const fetchDataUserNumbers = createAsyncThunk("data/fetchDataUserNumbers", async (token) => {
  try {
    const response = await fetch(`${urlAPI}/api/token/database/user/message/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: token }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw Error("Error fetching data");
  }
});

const initialState = {
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("user_info"))?.token || null,
};

const dataUserNumberSlice = createSlice({
  name: 'datausernumbers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataUserNumbers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataUserNumbers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchDataUserNumbers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectData = (state) => state.datausernumbers.data; // Getter để lấy dữ liệu từ fetchDataUserNumbers

export default dataUserNumberSlice.reducer;
