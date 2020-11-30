import {Form} from "react-final-form";
import React from "react";
import PropTypes from "prop-types";
import SendButtons from "#components/medium/send-form/send-buttons";
import SendInputs from "#components/medium/send-form/send-inputs";

const SendForm = ({formID = SendForm.defaultID, onSubmit, isBuffWritting}) => {

  return (
    <Form onSubmit={onSubmit}
          mutators={{
            ...SendInputs.getFormMutators(),
            ...SendButtons.getFormMutators()
          }}
          render={({handleSubmit, form, values, submitting}) => {
            return (
              <>
                <SendInputs
                  handleSubmit={handleSubmit}
                  submitting={submitting}
                  formID={formID}

                  currentMethod={values.method || `GET`}
                  toggleMethod={form.mutators.toggleMethod}

                  currentHandlerType={values.handlerType || `server`}
                  toggleHandlerType={form.mutators.toggleHandlerType}
                />

                <SendButtons
                  formID={formID}
                  handleSubmit={handleSubmit}
                  changeFormType={(type) => form.change(`type`, type)}
                  isBuffWritting={isBuffWritting}
                />
              </>
            );
          }} />
  );
};

SendForm.defaultID = `send-form`;

SendForm.propTypes = {
  formID: PropTypes.string,
  isBuffWritting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SendForm;
