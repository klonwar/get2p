import {createAsyncThunk} from "@reduxjs/toolkit";
import {StorageHelper} from "../functions";
import {encrypt, decrypt} from "#src/js/core/crypto";
import {SERVER_BASE} from "../../../server.config";

export const Operations = {
  sendRequest: createAsyncThunk(`send-request`, async ({token}) => {
    try {
      const {redirectTo, handlerType} = decrypt(token);

      if (handlerType === `server`) {
        const response = await fetch(`${SERVER_BASE}/request/${token}/`);

        if (redirectTo) {
          location.assign(redirectTo);
        }

        const responseJSON = (response.ok) ? await response.json() : undefined;

        return {code: response.status, type: responseJSON?.type, message: responseJSON?.data || response?.statusText};
      } else if (handlerType === `client`) {
        const {link, credentials, method = `GET`, body, headers, noCorsMode} = decrypt(token);

        const autoHeaders = {};
        if (body && (method !== `GET`)) {
          try {
            JSON.parse(body);
            autoHeaders[`content-type`] = `application/json`;
          } catch (e) {
            autoHeaders[`content-type`] = `application/x-www-form-urlencoded`;
          }
        }

        const response = await fetch(link, {
          mode: (noCorsMode) ? `no-cors` : undefined,
          credentials: (credentials) ? `include` : undefined,
          method,
          body: (method !== `GET`) ? body : undefined,
          headers: {
            ...autoHeaders,
            ...headers
          }
        });

        if (redirectTo) {
          location.assign(redirectTo);
        }

        const responseJSON = await response.text();

        return (response.status !== 0)
          ? {code: response.status, message: responseJSON}
          : {code: -2, message: `Content unavailable in case of no-cors mode`};
      } else {
        return undefined;
      }

    } catch (e) {
      console.error(e);
      return {code: -1, message: `Connection refused`};
    }
  }),
  getFavicon: createAsyncThunk(`get-favicon`, async ({protocol, domainUrl}) => {
    try {
      const response = await (await fetch(`${SERVER_BASE}/favicon/${encrypt(`${protocol}//${domainUrl}`)}/`)).json();
      StorageHelper.favicons.put(domainUrl, response);

      return {[domainUrl]: response.data};
    } catch (e) {
      console.error(e);
      throw e;
    }
  }),
  getUuid: createAsyncThunk(`get-uuid`, async ({token}) => {
    try {
      const response = (await (await fetch(`${SERVER_BASE}/uuid/c/${token}/`)).json());
      return {ok: true, ...response};
    } catch (e) {
      console.error(e);
      return {ok: false, token, uuid: ``, error: e.message};
    }
  }),
  getToken: createAsyncThunk(`get-token`, async ({uuid}) => {
    try {
      const response = (await (await fetch(`${SERVER_BASE}/uuid/g/${uuid}/`)).json());
      if (!response.token) {
        return {ok: false, uuid, token: ``, error: `Невалидный UUID`};
      }
      return {ok: true, ...response};
    } catch (e) {
      return {ok: false, uuid, token: ``, error: e.message};
    }
  })
};
