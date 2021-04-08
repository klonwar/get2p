import fetchMock from "fetch-mock";
import {Operations} from "#src/js/redux/operations/operations";
import {SERVER_BASE} from "#src/config";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {UuidRouterResponse} from "#server/src/routes/uuid-router";
import {MethodEnum, HandlerTypeEnum, Token } from "#server/src/model/token";

const mockStore = configureMockStore([thunk]);

const token = new Token({
  link: `https://google.com`,
  method: MethodEnum.GET,
  handlerType: HandlerTypeEnum.SERVER,
  shortLink: true
});

describe(`CreateUuidOperation`, () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test(`Normal response`, async () => {
    const store = mockStore({});

    fetchMock.getOnce(`${SERVER_BASE}/uuid/c/${token.toEncryptedString()}/`, () => {
      return {
        uuid: `mock-uuid`
      } as UuidRouterResponse;
    });

    await store.dispatch(Operations.createUuid({token}) as never);

    expect(store.getActions()[1].type).toBe(`get-uuid/fulfilled`);
    expect(store.getActions()[1].payload).toEqual({
      ok: true,
      token: token.toEncryptedString(),
      uuid: `mock-uuid`
    });
  });

  test(`Error`, async () => {
    const store = mockStore({});

    fetchMock.getOnce(`${SERVER_BASE}/uuid/c/${token.toEncryptedString()}/`, () => {
      throw new Error(`mock-error`);
    });

    await store.dispatch(Operations.createUuid({token}) as never);

    expect(store.getActions()[1].type).toBe(`get-uuid/fulfilled`);
    expect(store.getActions()[1].payload).toEqual({
      ok: false,
      token: token.toEncryptedString(),
      error: `mock-error`
    });
  });
});