import "@testing-library/jest-dom";
import React from "react";
import {HandlerTypeEnum, MethodEnum} from "#server/src/model/token";
import {BrowserRouter} from "react-router-dom";
import MainForm from "#components/reusable/main-form/main-form";
import SendForm, {SendFormType} from "#components/reusable/send-form/send-form";
import {renderWithRedux} from "#src/test-utils";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {act} from "@testing-library/react";
import fetchMock from "fetch-mock";
import {UuidRouterResponse} from "#server/src/routes/uuid-router";
import rootReducer from "#src/js/redux/reducers/root-reducer";

jest.mock(`#components/reusable/send-form/send-form`, () => ({
  __esModule: true,
  ...jest.requireActual(`#components/reusable/send-form/send-form`),
  default: jest.fn(() => (
    <div data-testid={`SendForm`}/>
  )),
}));

const mockHistoryPush = jest.fn();

jest.mock(`react-router-dom`, () => ({
  __esModule: true,
  ...jest.requireActual(`react-router-dom`),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockStore = configureMockStore([thunk]);

const createForm = () => (
  <BrowserRouter>
    <MainForm/>
  </BrowserRouter>
);
const submit = async (...data) => await (SendForm as jest.Mock).mock.calls[0][0].onSubmit(...data);

describe(`MainForm`, () => {
  afterEach(() => {
    fetchMock.restore();
    mockHistoryPush.mockClear();
    (SendForm as jest.Mock).mockClear();
  });

  test(`Renders correctly`, () => {
    const store = mockStore({});
    const {getByTestId} = renderWithRedux(createForm(), {store});

    expect(getByTestId(`SendForm`)).toBeInTheDocument();
  });

  describe(`Submit token only`, () => {
    const simpleToken = {
      link: `https://google.com`,
      handlerType: HandlerTypeEnum.SERVER,
      method: MethodEnum.GET,
      shortLink: false
    };

    test(`Simple send`, async () => {
      mockHistoryPush.mockClear();
      renderWithRedux(createForm());

      await act(async () => {
        await submit({
          type: SendFormType.SEND,
          ...simpleToken
        });
      });

      expect(mockHistoryPush).toBeCalledTimes(1);
    });

    test(`New window`, async () => {
      const openMock = jest.fn();
      window.open = openMock;
      delete window.location;
      const mockURL = `https://mock.mock`;
      window.location = new URL(mockURL) as never;

      renderWithRedux(createForm());

      await act(async () => {
        await submit({
          type: SendFormType.SEND_NEW_WINDOW,
          ...simpleToken
        });
      });

      expect(openMock.mock.calls[0][0].startsWith(mockURL)).toBe(true);
      expect(openMock).toBeCalledWith(expect.anything(), `_blank`);
    });

    test(`Favorite`, async () => {
      const store = mockStore({});
      renderWithRedux(createForm(), {store});

      await act(async () => {
        await submit({
          type: SendFormType.FAVORITE,
          ...simpleToken
        });
      });

      expect(store.getActions().findIndex((item) => item.type === `get-favicon/pending`)).not.toBe(-1);
      expect(store.getActions().findIndex((item) => item.type === `favorite/addToFavorite`)).not.toBe(-1);
    });

    test(`Clipboard`, async () => {
      delete window.location;
      const mockURL = `https://mock.mock`;
      window.location = new URL(mockURL) as never;
      const clipboardMock = jest.fn();
      clipboardMock.mockReturnValue(new Promise(resolve => resolve(true)));

      Object.assign(navigator, {
        clipboard: {
          writeText: clipboardMock
        }
      } as never);

      renderWithRedux(createForm());

      await act(async () => {
        await submit({
          type: SendFormType.CLIPBOARD,
          ...simpleToken
        });
      });

      expect(clipboardMock.mock.calls[0][0].startsWith(mockURL)).toBe(true);
    });
  });

  describe(`Submit uuid`, () => {
    const anotherToken = {
      link: `https://google.com`,
      handlerType: HandlerTypeEnum.SERVER,
      method: MethodEnum.GET,
      shortLink: true
    };

    test(`Simple send`, async () => {
      mockHistoryPush.mockClear();
      fetchMock.getOnce((url) => url.includes(`/uuid/c/`), () => {
        return {
          uuid: `mock-uuid`
        } as UuidRouterResponse;
      });

      renderWithRedux(createForm());

      await act(async () => {
        await submit({
          type: SendFormType.SEND,
          ...anotherToken
        });
      });

      expect(mockHistoryPush).toBeCalledWith(`/send/mock-uuid`);
    });

    test(`New window`, async () => {
      const openMock = jest.fn();
      window.open = openMock;
      delete window.location;
      const mockURL = `https://mock.mock`;
      window.location = new URL(mockURL) as never;

      fetchMock.getOnce((url) => url.includes(`/uuid/c/`), () => {
        return {
          uuid: `mock-uuid`
        } as UuidRouterResponse;
      });

      renderWithRedux(createForm());

      await act(async () => {
        await submit({
          type: SendFormType.SEND_NEW_WINDOW,
          ...anotherToken
        });
      });

      expect(openMock.mock.calls[0][0].startsWith(mockURL)).toBe(true);
      expect(openMock).toBeCalledWith(expect.anything(), `_blank`);
    });

    describe(`Favorite`, () => {
      test(`Uuid creates correctly`, async () => {
        const store = mockStore({});
        store.replaceReducer(rootReducer);

        fetchMock.getOnce((url) => url.includes(`/uuid/c/`), () => {
          return {
            uuid: `mock-uuid`
          } as UuidRouterResponse;
        });

        renderWithRedux(createForm(), {store});

        await act(async () => {
          await submit({
            type: SendFormType.FAVORITE,
            ...anotherToken
          });
        });

        expect(store.getActions().findIndex((item) => item.type === `get-uuid/fulfilled`)).not.toBe(-1);
        expect(store.getActions().find((item) => item.type === `get-uuid/fulfilled`).payload.uuid).toBe(`mock-uuid`);
      });

      // todo Проверка на диспатчинг в favorite
    });

    test(`Clipboard`, async () => {
      delete window.location;
      const mockURL = `https://mock.mock`;
      window.location = new URL(mockURL) as never;
      const clipboardMock = jest.fn();
      clipboardMock.mockReturnValue(new Promise(resolve => resolve(true)));

      Object.assign(navigator, {
        clipboard: {
          writeText: clipboardMock
        }
      } as never);

      fetchMock.getOnce((url) => url.includes(`/uuid/c/`), () => {
        return {
          uuid: `mock-uuid`
        } as UuidRouterResponse;
      });

      renderWithRedux(createForm());

      await act(async () => {
        await submit({
          type: SendFormType.CLIPBOARD,
          ...anotherToken
        });
      });

      expect(clipboardMock.mock.calls[0][0].startsWith(mockURL)).toBe(true);
    });

  });

});