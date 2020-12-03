import {createSlice} from "@reduxjs/toolkit";

/**
 * instantReducer: {
 *    token: {string}
 * }
 * */

const instantSlice = createSlice({
  name: `send`,
  initialState: {
    token: {}
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
});

export const InstantActions = {
  ...instantSlice.actions
};
export default instantSlice.reducer;
