import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authAdminReducer from './slices/authAdminSlice';
import regularUserAccountReducer from './slices/regularUserAccountSlice';
import authUserReducer from './slices/authUserSlice';
import dataReducer from './slices/dataSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    authAdmin: authAdminReducer,
    regularUser: regularUserAccountReducer,
    authUser: authUserReducer, 
    data: dataReducer,
  },
});


export default store;
