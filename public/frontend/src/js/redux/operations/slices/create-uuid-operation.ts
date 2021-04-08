import {SERVER_BASE} from "#src/config";
import {UuidRouterResponse} from "#server/src/routes/uuid-router";
import {Token} from "#server/src/model/token";

const createUuidOperation = async ({token}: { token: Token }): Promise<UuidOperationResult> => {
  try {
    const response = (await (await fetch(`${SERVER_BASE}/uuid/c/${token.toEncryptedString()}/`)).json()) as UuidRouterResponse;
    return {ok: true, ...response, token: token.toEncryptedString()};
  } catch (e) {
    return {ok: false, error: e.message, token: token.toEncryptedString()};
  }
};

export interface UuidOperationResult extends UuidRouterResponse {
  ok: boolean,
  error?: string,
}

export default createUuidOperation;