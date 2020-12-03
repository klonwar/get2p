import {Operations} from "#src/js/redux/operations";
import {createSlice} from "@reduxjs/toolkit";

/**
 * uuidReducer: {
 *   generatedUuids: {
 *     [decodedToken]: {
 *       ok: {boolean},
 *       uuid: {string}
 *     },
 *   },
 *   tokensFromUUID: {
 *     [uuid]: {
 *       ok: {boolean},
 *       decodedToken: {string}
 *     },
 *   },
 *   errors: {
 *
 *   }
 * }
 * */

const uuidSlice = createSlice({
  name: `uuid`,
  initialState: {},
  reducers: {
    removeUuid: (state, action) => ({
      ...state,
      uuids: {
        ...state.uuids,
        [action.payload.token]: undefined
      }
    }),
    removeToken: (state, action) => ({
      ...state,
      tokens: {
        ...state.tokens,
        [action.payload.uuid]: undefined
      }
    })
  },
  extraReducers: {
    [Operations.getUuid.pending]: (state, action) => ({
      ...state,
      pending: true
    }),
    [Operations.getUuid.rejected]: (state, action) => ({
      ...state,
      pending: false
    }),
    [Operations.getUuid.fulfilled]: (state, action) => ({
      ...state,
      pending: false,
      uuids: {
        ...state.uuids,
        [action.payload.token]: {
          ok: action.payload.ok,
          uuid: action.payload.uuid,
          error: action.payload.error,
        }
      }
    }),
    [Operations.getToken.pending]: (state, action) => ({
      ...state,
      pending: true
    }),
    [Operations.getToken.rejected]: (state, action) => ({
      ...state,
      pending: false
    }),
    [Operations.getToken.fulfilled]: (state, action) => ({
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
    })
  }
});

export const UuidActions = {
  ...uuidSlice.actions
};
export default uuidSlice.reducer;
