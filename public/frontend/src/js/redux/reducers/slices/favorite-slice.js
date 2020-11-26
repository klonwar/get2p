import {createSlice} from "@reduxjs/toolkit";
import {Operations} from "#src/js/redux/operations";
import {StorageHelper} from "#src/js/functions";

/**
 * favoriteReducer: {
 *   favorite: {
 *     [token]: {
 *
 *     }
 *   }
 * }
 * */

const favoriteSlice = createSlice({
  name: `favorite`,
  initialState: {},
  reducers: {
    favoriteFromStorage: (state) => {
      state.favorite = StorageHelper.favorite.list();
    }
  },
});

export const FavoriteActions = {
  ...favoriteSlice.actions
};
export default favoriteSlice.reducer;
