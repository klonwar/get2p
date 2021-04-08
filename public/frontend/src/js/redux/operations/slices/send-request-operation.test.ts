import fetchMock from "fetch-mock";
import {Operations} from "#src/js/redux/operations/operations";
import {SERVER_BASE} from "#src/config";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {HandlerTypeEnum, MethodEnum, Token} from "#server/src/model/token";
import {configureAppStore} from "#src/test-utils";
import waitFor from "#src/js/core/functions/wait-for";
import * as assert from "assert";

const mockStore = configureMockStore([thunk]);

describe(`SendRequestOperation`, () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test(`Server request`, async () => {
    const store = mockStore({});
    const token = new Token({
      link: `https://google.com`,
      method: MethodEnum.GET,
      handlerType: HandlerTypeEnum.SERVER,
      shortLink: true
    });

    fetchMock.getOnce(`${SERVER_BASE}/request/${token.toEncryptedString()}/`, () => {
      return {
        type: `text`,
        data: `mock-data`,
        cookies: []
      };
    });

    await store.dispatch(Operations.sendRequest({token}) as never);

    expect(store.getActions()[1].type).toBe(`send-request/fulfilled`);
    expect(store.getActions()[1].payload).toEqual({
      code: 200,
      type: `text`,
      message: `mock-data`,
      startTime: expect.anything(),
      cookies: []
    });
  });

  test(`No irrelevant data in storage`, async () => {
    const store = configureAppStore();
    const firstToken = new Token({
      link: `https://google.com`,
      method: MethodEnum.GET,
      handlerType: HandlerTypeEnum.SERVER,
      shortLink: true
    });
    const secondToken = new Token({
      link: `https://yandex.ru`,
      method: MethodEnum.GET,
      handlerType: HandlerTypeEnum.SERVER,
      shortLink: true
    });

    // Первый запрос был отправлен раньше, но придет позже
    // State должен хранить только актуальный запрос (второй)
    fetchMock.getOnce(`${SERVER_BASE}/request/${firstToken.toEncryptedString()}/`, async () => {
      await waitFor(999);
      return {
        type: `text`,
        data: `mock-data-first`,
        cookies: []
      };
    });
    fetchMock.getOnce(`${SERVER_BASE}/request/${secondToken.toEncryptedString()}/`, async () => {
      await waitFor(499);
      return {
        type: `text`,
        data: `mock-data-second`,
        cookies: []
      };
    });

    store.dispatch(Operations.sendRequest({token: firstToken}) as never);
    store.dispatch(Operations.sendRequest({token: secondToken}) as never);

    expect(store.getState().sendReducer.siteResponse).toEqual({});

    await waitFor(500);

    expect(store.getState().sendReducer.siteResponse).toEqual({
      startTime: expect.anything(),
      code: 200,
      type: `text`,
      message: `mock-data-second`,
      cookies: []
    });

    await waitFor(500);

    expect(store.getState().sendReducer.siteResponse).toEqual({
      startTime: expect.anything(),
      code: 200,
      type: `text`,
      message: `mock-data-second`,
      cookies: []
    });
  });

  // todo other types
});