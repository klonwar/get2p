import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {Operations} from "#src/js/redux/operations/operations";
import {SendRequestOperationResult} from "#src/js/redux/operations/slices/send-request-operation";

interface SendState {
  siteResponse: SendRequestOperationResult
}

const sendSlice = createSlice({
  name: `send`,
  initialState: {
    siteResponse: {}
  } as SendState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SendState>) => {
    builder
      .addCase(
        Operations.sendRequest.fulfilled,
        (state, action) => {
          if (!state.siteResponse.startTime || state.siteResponse.startTime < action.payload.startTime) {
            state.siteResponse = action.payload;
          }
        });
  }
});

export const SendActions = {
  ...sendSlice.actions
};
export default sendSlice.reducer;
