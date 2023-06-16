import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { urlAPI } from "../services_api";

export const fetchData = createAsyncThunk("data/fetchData", async (token) => {
  try {
    const response = await fetch(`${urlAPI}/api/token/database/`, {
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

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectData = (state) => state.data.data; // Getter để lấy dữ liệu từ fetchData

export default dataSlice.reducer;
