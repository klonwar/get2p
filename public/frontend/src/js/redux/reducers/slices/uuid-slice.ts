import {Operations} from "#src/js/redux/operations/operations";
import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UuidOperationResult} from "#src/js/redux/operations/slices/create-uuid-operation";

export interface UuidsStateList {
  [decodedToken: string]: UuidOperationResult
}

export interface TokensStateList {
  [uuid: string]: UuidOperationResult
}

interface UuidState {
  uuids: UuidsStateList,
  tokens: TokensStateList,
  pending: boolean
}

const uuidSlice = createSlice({
  name: `uuid`,
  initialState: {
    uuids: {},
    tokens: {},
    pending: false
  } as UuidState,
  reducers: {
    removeUuid: (state: UuidState, action: PayloadAction<{ token: string }>) => {
      state.uuids = {
        ...state.uuids,
        [action.payload.token]: undefined
      };
    },
    removeToken: (state: UuidState, action: PayloadAction<{ uuid: string }>) => {
      state.tokens = {
        ...state.tokens,
        [action.payload.uuid]: undefined
      };
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<UuidState>) => {
    builder
      .addCase(
        Operations.createUuid.pending,
        (state) => {
          state.pending = true;
        })
      .addCase(
        Operations.createUuid.rejected,
        (state) => {
          state.pending = false;
        })
      .addCase(
        Operations.createUuid.fulfilled,
        (state, action) => {
          state.pending = false;
          state.uuids[action.payload.token] = {
            ...action.payload
          };
        })
      .addCase(
        Operations.getToken.pending, (state) => ({
          ...state,
          pending: true
        }))
      .addCase(
        Operations.getToken.rejected, (state) => ({
          ...state,
          pending: false
        }))
      .addCase(
        Operations.getToken.fulfilled, (state, action) => ({
          ...state,
          pending: false,
          tokens: {
            ...state.uuids,
            [action.payload.uuid]: {
              ok: action.payload.ok,
              token: action.payload.token,
              error: action.payload.error,
            }
          }
        }));
  }
});

export const UuidActions = {
  ...uuidSlice.actions
};
export default uuidSlice.reducer;
