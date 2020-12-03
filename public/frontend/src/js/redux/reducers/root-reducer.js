import {combineReducers} from "@reduxjs/toolkit";
import sendReducer from "./slices/send-slice";
import favoriteReducer from "./slices/favorite-slice";
import uuidReducer from "./slices/uuid-slice";
import instantReducer from "./slices/instant-slice";

export default combineReducers({
  sendReducer,
  favoriteReducer,
  uuidReducer,
  instantReducer
});
