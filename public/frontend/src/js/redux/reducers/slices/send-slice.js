import {createSlice} from "@reduxjs/toolkit";
import {Operations} from "#src/js/redux/operations";

/**
 * sendReducer: {
 *   siteResponse: {
 *     code: {number},
 *     message: {string}
 *   },
 *   favicons: {
 *     [domainUrl]: {blob}
 *   }
 * }
 * */

const sendSlice = createSlice({
  name: `send`,
  initialState: {},
  reducers: {
    clearResponse: (state) => {
      state.siteResponse = {};
    }
  },
  extraReducers: {
    [Operations.sendRequest.fulfilled]: (state, action) => ({
      ...state,
      siteResponse: {...action.payload}
    }),
    [Operations.sendRequest.rejected]: (state, action) => ({
      ...state,
      siteResponse: {...action.payload}
    }),
    [Operations.getFavicon.fulfilled]: (state, action) => ({
      ...state,
      favicons: {
        ...state.favicons,
        ...action.payload
      }
    }),
  }
});

export const SendActions = {
  ...sendSlice.actions
};
export default sendSlice.reducer;
