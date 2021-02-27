import {HandlerTypeEnum, MethodEnum, Token} from "#server/src/model/token";
import {SERVER_BASE} from "#client/server.config";
import {RequestRouterResponse} from "#server/src/routes/request-router";

const serverRequest = async (token: Token): Promise<SendRequestOperationResult> => {
  const startTime = Date.now();
  const response = await fetch(`${SERVER_BASE}/request/${token.toEncryptedString()}/`);

  if (token.redirectTo) {
    location.assign(token.redirectTo);
  }

  const responseJSON = (response.ok) ? await response.json() as RequestRouterResponse : undefined;

  return {
    startTime,
    code: response.status,
    type: responseJSON?.type,
    message: responseJSON?.data || response?.statusText,
    cookies: responseJSON?.cookies
  };
};

const clientRequest = async (token: Token): Promise<SendRequestOperationResult> => {
  const startTime = Date.now();
  const {link, credentials, method = MethodEnum.GET, body, headers, noCorsMode} = token;

  const autoHeaders = {} as Headers;
  if (body && (method !== MethodEnum.GET)) {
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
    method: method as string,
    body: (method !== MethodEnum.GET) ? body : undefined,
    headers: {
      ...autoHeaders,
      ...headers
    }
  });

  if (token.redirectTo) {
    location.assign(token.redirectTo);
  }

  const responseJSON = await response.text();

  return ((response.status !== 0)
      ? {startTime, code: response.status, message: responseJSON}
      : {startTime, code: -2, message: `Content unavailable in case of no-cors mode`}
  );
};

const sendRequestOperation = async ({token}: { token: Token }): Promise<SendRequestOperationResult> => {
  try {
    switch (token.handlerType) {
      case HandlerTypeEnum.SERVER:
        return await serverRequest(token);
      case HandlerTypeEnum.CLIENT:
        return await clientRequest(token);
    }
  } catch (e) {
    console.error(e);
    return {code: -1, message: `Connection refused`} as SendRequestOperationResult;
  }
};

export interface SendRequestOperationResult {
  startTime?: number;
  code?: number;
  message?: string;
  type?: string;
  cookies?: Array<string>;
}

export default sendRequestOperation;