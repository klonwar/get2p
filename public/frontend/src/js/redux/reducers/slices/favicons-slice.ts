import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StorageHelper} from "#src/js/core/storage-helper";
import {Operations} from "#src/js/redux/operations/operations";

export interface FaviconsState {
  favicons: Record<string, FaviconsStateItem>;
}

export interface FaviconsStateItem {
  data: string;
}

const faviconsSlice = createSlice({
  name: `favicons`,
  initialState: {
    favicons: {}
  } as FaviconsState,
  reducers: {
    faviconsFromStorage: (state: FaviconsState) => {
      if (StorageHelper.favicons.list()) {
        state.favicons = StorageHelper.favicons.list().favicons;
      }
    },
    addToFavicons: (state: FaviconsState, action: PayloadAction<{ key: string, value: FaviconsStateItem }>) => {
      state.favicons[action.payload.key] = action.payload.value;
    },
    removeFromFavicons: (state: FaviconsState, action: PayloadAction<{ key: string }>) => {
      delete state.favicons[action.payload.key];
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<FaviconsState>) => {
    builder
      .addCase(
        Operations.requestFavicon.fulfilled,
        (state, action) => {
          state.favicons[action.payload.key] = action.payload.value;
        });
  }
});

export const FaviconsActions = {
  ...faviconsSlice.actions,
};
export default faviconsSlice.reducer;
