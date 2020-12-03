import React from "react";
import SendForm from "#components/medium/send-form/send-form";
import {encrypt} from "#src/js/core/crypto";
import OverlaySpinner from "#components/medium/spinner-wrapper/overlay-spinner";
import SendInputs from "#components/medium/send-inputs/send-inputs";
import SendButtons from "#components/medium/send-buttons/send-buttons";
import {Form} from "react-final-form";
import CodeBlock from "#components/small/code-block/code-block";
import SendView from "#components/big/send/send";
import InstantForm from "#components/medium/instant-form/instant-form";

const Instant = () => {
  const mockResponse = `{\n` +
    `  "userId": 1,\n` +
    `  "id": 1,\n` +
    `  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",\n` +
    `  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"\n` +
    `}`;
  const mockPayload = `dcc0f337-4811-4bab-a693-0d017c430ac1`;

  return (
    <>
      <div className={`uk-padding uk-padding-remove-vertical`}>
        <div className={`uk-text-center`} uk-grid={``}>
          <InstantForm onSubmit={() => {}}/>
        </div>
      </div>
    </>
  );
};

export default Instant;
