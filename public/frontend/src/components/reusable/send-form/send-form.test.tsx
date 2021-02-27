import "@testing-library/jest-dom";
import React from "react";
import {screen} from "@testing-library/react";
import SendForm from "#components/reusable/send-form/send-form";
import {BrowserRouter} from "react-router-dom";

const onSubmit = jest.fn();
const form = (
  <BrowserRouter>
    <SendForm onSubmit={onSubmit} isBuffWriting={false}/>
  </BrowserRouter>
);
const getFormItems = (getAllByRole: typeof screen.getAllByRole) => {
  const submitButtons = getAllByRole(`button`).filter((item) => item.getAttribute(`type`) === `submit`);
  const inputFields = getAllByRole(`textbox`);
  const switchButtons = getAllByRole(`button`).filter((item) => item.getAttribute(`type`) === `button`);

  return {
    submitButtons,
    switchButtons,
    inputFields,

    sendButton: submitButtons[0],
    favoriteButton: submitButtons[1],
    clipboardButton: submitButtons[2],

    methodSwitch: switchButtons[0],
    handlerSwitch: switchButtons[1],

    linkField: inputFields.find((item) => item.getAttribute(`name`) === `link`),
  };
};

describe(`SendForm`, () => {
  beforeEach(() => {
    onSubmit.mockClear();
  });
});