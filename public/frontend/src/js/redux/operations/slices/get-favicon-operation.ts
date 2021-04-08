import {SERVER_BASE} from "#src/config";
import {encrypt} from "#server/src/util/crypto";
import {FaviconRouterResponse} from "#server/src/routes/favicon-router";

const getFaviconOperation = async (
  {protocol, domainUrl}: { protocol: string, domainUrl: string }
): Promise<GetFaviconOperationResult> => {
  const response = await (await fetch(`${SERVER_BASE}/favicon/${encrypt(`${protocol}//${domainUrl}`)}/`)).json() as FaviconRouterResponse;
  return {key: domainUrl, value: response};
};

export interface GetFaviconOperationResult {
  key: string,
  value: { data: string }
}

export default getFaviconOperation;