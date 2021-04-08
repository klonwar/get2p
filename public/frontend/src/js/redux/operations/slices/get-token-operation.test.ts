import fetchMock from "fetch-mock";
import {Operations} from "#src/js/redux/operations/operations";
import {SERVER_BASE} from "#src/config";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { UuidRouterResponse } from "#server/src/routes/uuid-router";

const mockStore = configureMockStore([thunk]);

describe(`GetTokenOperation`, () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test(`Normal response`, async () => {
    const store = mockStore({});

    fetchMock.getOnce(`${SERVER_BASE}/uuid/g/mock-uuid/`, () => {
      return {
        token: `mock-token`,
        uuid: `mock-uuid`
      } as UuidRouterResponse;
    });

    await store.dispatch(Operations.getToken({uuid: `mock-uuid`}) as never);

    expect(store.getActions()[1].type).toBe(`get-token/fulfilled`);
    expect(store.getActions()[1].payload).toEqual({
      ok: true,
      token: `mock-token`,
      uuid: `mock-uuid`
    });
  });

  test(`Invalid UUID`, async () => {
    const store = mockStore({});

    fetchMock.getOnce(`*`, () => {
      return {};
    });

    await store.dispatch(Operations.getToken({uuid: `mock-uuid`}) as never);

    expect(store.getActions()[1].type).toBe(`get-token/fulfilled`);
    expect(store.getActions()[1].payload).toEqual({
      ok: false,
      token: ``,
      uuid: `mock-uuid`,
      error: `Невалидный UUID`
    });
  });

  test(`Error`, async () => {
    const store = mockStore({});

    fetchMock.getOnce(`${SERVER_BASE}/uuid/g/mock-uuid/`, () => {
      throw new Error(`mock-error`);
    });

    await store.dispatch(Operations.getToken({uuid: `mock-uuid`}) as never);

    expect(store.getActions()[1].type).toBe(`get-token/fulfilled`);
    expect(store.getActions()[1].payload).toEqual({
      ok: false,
      token: ``,
      uuid: `mock-uuid`,
      error: `mock-error`
    });
  });
});