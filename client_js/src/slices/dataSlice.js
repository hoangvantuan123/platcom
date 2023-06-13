import { createSlice } from '@reduxjs/toolkit';
import { urlAPI } from '../services_api';
const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;

export const fetchAllData = () => {
    return async (dispatch) => {
      try {
        dispatch(fetchDataStart());
  
        // Gửi yêu cầu lấy dữ liệu từ backend
        const response = await fetch(`${urlAPI}/api/data/`);
  
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu từ backend');
        }
  
        const data = await response.json();
  
        // Lấy dữ liệu thành công, cập nhật state trong Redux
        dispatch(fetchDataSuccess(data));
      } catch (error) {
        // Xử lý lỗi nếu có
        dispatch(fetchDataFailure(error.message));
      }
    };
  };

export default dataSlice.reducer;
