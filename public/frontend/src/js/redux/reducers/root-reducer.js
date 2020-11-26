import {combineReducers} from "@reduxjs/toolkit";
import sendReducer from "./slices/send-slice";
import favoriteReducer from "./slices/favorite-slice";
import uuidReducer from "./slices/uuid-slice";

export default combineReducers({
  sendReducer,
  favoriteReducer,
  uuidReducer
});
