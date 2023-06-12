import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authAdminReducer from './slices/authAdminSlice';
import regularUserAccountReducer from './slices/regularUserAccountSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    authAdmin: authAdminReducer,
    regularUser: regularUserAccountReducer
  },
});


export default store;
