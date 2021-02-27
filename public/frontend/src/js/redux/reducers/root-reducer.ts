import {combineReducers} from "@reduxjs/toolkit";
import sendReducer from "./slices/send-slice";
import settingsReducer from "./slices/settings-slice";
import uuidReducer from "./slices/uuid-slice";
import instantReducer from "./slices/instant-slice";
import favoriteReducer from "./slices/favorite-slice";
import faviconsReducer from "./slices/favicons-slice";

const rootReducer = combineReducers({
  sendReducer,
  favoriteReducer,
  uuidReducer,
  settingsReducer,
  instantReducer,
  faviconsReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
