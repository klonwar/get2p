import "@testing-library/jest-dom";
import React from "react";
import {HandlerTypeEnum, MethodEnum} from "#server/src/model/token";
import {BrowserRouter} from "react-router-dom";
import {renderWithRedux} from "#src/test-utils";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {act} from "@testing-library/react";
import InstantForm from "#components/reusable/instant-form/instant-form";
import SendInputs from "#components/reusable/send-form/send-inputs";
import InstantSend from "#components/reusable/instant-form/instant-send";

jest.mock(`#components/reusable/send-form/send-inputs`, () => ({
  __esModule: true,
  ...jest.requireActual(`#components/reusable/send-form/send-inputs`),
  default: jest.fn(() => (
    <div data-testid={`SendInputs`}/>
  )),
}));

jest.mock(`#components/reusable/instant-form/instant-send`, () => ({
  __esModule: true,
  ...jest.requireActual(`#components/reusable/instant-form/instant-send`),
  default: jest.fn(() => (
    <div data-testid={`InstantSend`}/>
  )),
}));

const mockStore = configureMockStore([thunk]);

const createForm = () => (
  <BrowserRouter>
    <InstantForm/>
  </BrowserRouter>
);

const submit = async (...data) => await ((SendInputs as unknown) as jest.Mock).mock.calls[0][0].onChange(...data);

describe(`InstantForm`, () => {
  afterEach(() => {
    ((InstantSend as unknown) as jest.Mock).mockClear();
    ((SendInputs as unknown) as jest.Mock).mockClear();
  });

  test(`Renders correctly`, () => {
    const store = mockStore({});
    const {getByTestId} = renderWithRedux(createForm(), {store});

    expect(getByTestId(`InstantSend`)).toBeInTheDocument();
    expect(getByTestId(`SendInputs`)).toBeInTheDocument();
  });

  describe(`Requests`, () => {
    const simpleToken = {
      link: `https://google.com`,
      handlerType: HandlerTypeEnum.SERVER,
      method: MethodEnum.GET,
      shortLink: false
    };

    test(`Simple request`, async () => {
      const store = mockStore({});

      renderWithRedux(createForm(), {store});

      await act(async () => {
        await submit({
          ...simpleToken
        });
      });

      expect(store.getActions().findIndex((item) => item.type === `send/setToken`)).not.toBe(-1);
    });

    test(`No irrelevant responses`, () => {

    });

  });
});