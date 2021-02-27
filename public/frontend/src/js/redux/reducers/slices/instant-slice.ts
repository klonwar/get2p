import {createSlice} from "@reduxjs/toolkit";

interface InstantState {
  tokenString: string
}

const instantSlice = createSlice({
  name: `send`,
  initialState: {
    tokenString: {}
  } as InstantState,
  reducers: {
    setToken: (state: InstantState, action) => {
      state.tokenString = action.payload;
    }
  }
});

export const InstantActions = {
  ...instantSlice.actions
};
export default instantSlice.reducer;
