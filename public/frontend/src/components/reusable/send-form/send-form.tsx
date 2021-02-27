import {Form} from "react-final-form";
import React, {FC} from "react";
import SendButtons from "#components/reusable/send-form/send-buttons";
import SendInputs from "#components/reusable/send-form/send-inputs";
import {TokenInterface} from "#server/src/model/token";
import UKCard from "#components/reusable/uk-card/uk-card";

export enum SendFormType {
  SEND,
  SEND_NEW_WINDOW,
  FAVORITE,
  CLIPBOARD
}

export interface SendFormData extends TokenInterface {
  type: SendFormType
}

interface Props {
  formID?: string,
  onSubmit: (formData: SendFormData) => void,
  isBuffWriting: boolean
}

const SendForm: FC<Props> = (props) => {
  const {
    formID = `send-form`,
    onSubmit,
    isBuffWriting
  } = props;

  return (
    <Form onSubmit={onSubmit}
          render={({handleSubmit}) => {
            return (
              <>
                <div className={`uk-width-1-2@m`}>
                  <UKCard>
                    <SendInputs
                      formID={formID}
                      onSubmit={handleSubmit}
                    />
                  </UKCard>
                </div>
                <div className={`uk-width-1-4@m uk-flex uk-flex-column uk-flex-around uk-visible@s`}
                     uk-margin={``}>
                  <SendButtons
                    formID={formID}
                    isBuffWriting={isBuffWriting}
                  />
                </div>
              </>
            );
          }}/>
  );
};

export default SendForm;
