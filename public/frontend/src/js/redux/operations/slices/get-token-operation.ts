import { UuidRouterResponse } from "#server/src/routes/uuid-router";
import {SERVER_BASE} from "#client/server.config.js";
import {UuidOperationResult} from "#src/js/redux/operations/slices/create-uuid-operation";

const getTokenOperation = async ({uuid}: { uuid: string }): Promise<UuidOperationResult> => {
  try {
    const response = (await (await fetch(`${SERVER_BASE}/uuid/g/${uuid}/`)).json()) as UuidRouterResponse;
    if (!response.token) {
      return {ok: false, uuid, token: ``, error: `Невалидный UUID`};
    }

    return {ok: true, uuid, ...response};
  } catch (e) {
    return {ok: false, uuid, token: ``, error: e.message};
  }
};

export default getTokenOperation;