import {Form, FormSpy} from "react-final-form";
import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SendInputs from "#components/medium/send-inputs/send-inputs";
import Send from "#components/big/send/send";
import {encrypt} from "#src/js/core/crypto";
import {connect} from "react-redux";
import {InstantActions} from "#src/js/redux/reducers/slices/instant-slice";
import tokenFromFormData from "#src/js/core/functions/token-from-form-data";
import InstantSend from "#components/medium/instant-send/instant-send";

const InstantForm = (props) => {
  const {
    formID = InstantForm.defaultID,
    onSubmit,
    setToken
  } = props;


  return (
    <>
      <Form onSubmit={onSubmit}
               mutators={{
                 ...SendInputs.getFormMutators()
               }}
               render={({handleSubmit, form, values, submitting}) => {
                 return (
                   <>
                     <div className={`uk-width-1-2@m`}>
                       <div className={`uk-card uk-card-body uk-card-default uk-text-left`}>
                         <SendInputs
                           handleSubmit={handleSubmit}
                           submitting={submitting}
                           formID={`instant-form`}
                           onChange={({values: newValues}) => setToken(tokenFromFormData(newValues))}

                           currentMethod={values.method || `GET`}
                           toggleMethod={form.mutators.toggleMethod}

                           currentHandlerType={values.handlerType || `server`}
                           toggleHandlerType={form.mutators.toggleHandlerType}
                         />
                       </div>
                     </div>
                   </>
                 );
               }} />
      <div className={`uk-width-1-2@m`}>
        <div className={`uk-height-1-1 uk-card uk-card-body uk-card-default uk-text-left uk-padding-remove`}>
          <InstantSend />
        </div>
      </div>
    </>
  );
};

InstantForm.defaultID = `instant-form`;

InstantForm.propTypes = {
  formID: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (data) => dispatch(InstantActions.setToken(data))
});

export default connect(null, mapDispatchToProps)(InstantForm);
