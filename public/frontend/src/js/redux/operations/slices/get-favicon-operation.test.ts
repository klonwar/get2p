import fetchMock from "fetch-mock";
import {Operations} from "#src/js/redux/operations/operations";
import {SERVER_BASE} from "#client/server.config";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {FaviconRouterResponse} from "#server/src/routes/favicon-router";

const mockStore = configureMockStore([thunk]);

describe(`GetFaviconOperation`, () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test(`Normal response`, async () => {
    const store = mockStore({});

    fetchMock.getOnce((url) => url.startsWith(`${SERVER_BASE}/favicon/`), () => {
      return {
        data: `mock-favicon`
      } as FaviconRouterResponse;
    });

    await store.dispatch(Operations.requestFavicon({protocol: `https:`, domainUrl: `google.com`}) as never);

    expect(store.getActions()[1].type).toBe(`get-favicon/fulfilled`);
    expect(store.getActions()[1].payload).toEqual({
      key: `google.com`,
      value: {
        data: `mock-favicon`
      }
    });
  });

  test(`Error`, async () => {
    const store = mockStore({});

    fetchMock.getOnce((url) => url.startsWith(`${SERVER_BASE}/favicon/`), () => {
      throw new Error(`mock-error`);
    });

    await store.dispatch(Operations.requestFavicon({protocol: `https:`, domainUrl: `google.com`}) as never);

    expect(store.getActions()[1].type).toBe(`get-favicon/rejected`);
    expect(store.getActions()[1].error.message).toBe(`mock-error`);
  });
});