import "@testing-library/jest-dom";
import React from "react";
import {render, screen} from "@testing-library/react";
import SwitchField from "#components/reusable/switch-field/switch-field";
import {Form} from "react-final-form";
import userEvent from "@testing-library/user-event";

const form = (options) => (
  <Form onSubmit={jest.fn()} render={() => (
    <form>
      <SwitchField options={options} name={`switch-test`}/>
    </form>
  )}/>
);

describe(`SwitchField`, () => {
  test(`Values only`, () => {
    const {getByRole, getAllByRole} = render(form([{value: `val1`}, {value: `val2`}, {value: `val-long`}]));

    // Три чекбокса, по количеству опций
    expect(getAllByRole(`radio`).length).toBe(3);

    // Placeholder, задающий размер пустого места
    const button = getByRole(`button`);
    const placeholder = button.querySelector(`span.uk-invisible`);
    expect(placeholder).toHaveTextContent(`val-long`);

    // То, что показывается в данный момент
    const visibleValue = button.querySelector(`div.uk-position-center > span`);
    expect(visibleValue).toHaveTextContent(`val1`);
  });

  test(`Labels only`, () => {
    const {getByRole} = render(form(
      [
        {value: `val1`, label: `label1`},
        {value: `val2`, label: `label2`},
        {value: `val-long`, label: `label-long-long`}
      ]
    ));

    const button = getByRole(`button`);
    const placeholder = button.querySelector(`span.uk-invisible`);
    expect(placeholder).toHaveTextContent(`label-long-long`);

    const visibleValue = button.querySelector(`div.uk-position-center > span`);
    expect(visibleValue).toHaveTextContent(`label1`);
  });

  test(`Click`, () => {
    const {getByRole} = render(form([{value: `val1`}, {value: `val2`, label: `label2`}, {value: `val-long`}]));

    const button = getByRole(`button`);
    const visibleValue = button.querySelector(`div.uk-position-center > span`);

    userEvent.click(button);
    expect(visibleValue).toHaveTextContent(`label2`);

    userEvent.click(button);
    expect(visibleValue).toHaveTextContent(`val-long`);
  });
});
