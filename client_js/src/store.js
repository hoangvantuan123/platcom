import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authAdminReducer from './slices/authAdminSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    authAdmin: authAdminReducer
  },
});


export default store;
