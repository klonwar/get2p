import {createAsyncThunk} from "@reduxjs/toolkit";
import sendRequestOperation from "#src/js/redux/operations/slices/send-request-operation";
import getFaviconOperation from "#src/js/redux/operations/slices/get-favicon-operation";
import createUuidOperation from "#src/js/redux/operations/slices/create-uuid-operation";
import getTokenOperation from "#src/js/redux/operations/slices/get-token-operation";

export const Operations = {
  sendRequest: createAsyncThunk(
    `send-request`,
    sendRequestOperation
  ),
  requestFavicon: createAsyncThunk(
    `get-favicon`,
    getFaviconOperation
  ),
  createUuid: createAsyncThunk(
    `get-uuid`,
    createUuidOperation
  ),
  getToken: createAsyncThunk(
    `get-token`,
    getTokenOperation
  )
};
