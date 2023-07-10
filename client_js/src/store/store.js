import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "../slices/userSlice";
import authAdminReducer from "../slices/authAdminSlice";
import regularUserAccountReducer from "../slices/regularUserAccountSlice";
import authUserReducer from "../slices/authUserSlice";
import dataReducer from "../slices/dataSlice";
import dataUserNumbersReducer from "../slices/userNumberSlice";
import chatReducer from "../slices/messagesSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    authAdmin: authAdminReducer,
    regularUser: regularUserAccountReducer,
    authUser: authUserReducer,
    data: dataReducer,
    datausernumbers: dataUserNumbersReducer,
    chat: chatReducer,
  },
  
});
export default store;
