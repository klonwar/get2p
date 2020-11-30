import {Link} from "react-router-dom";
import SwitchField from "#components/small/switch-field/switch-field";
import {Field} from "react-final-form";
import {headersValidator, linkValidator} from "#src/js/validators";
import {createInput} from "#src/js/functions";
import FlexGroup from "#components/small/flex-group/flex-group";
import FlexM from "#components/small/flex-m/flex-m";
import React from "react";
import PropTypes from "prop-types";
import SendForm from "#components/medium/send-form/send-form";

class SendInputs extends React.PureComponent {

  static getFormMutators = () => ({
    toggleMethod: (args, state, utils) => {
      utils.changeValue(state, `method`, (method) => (method === `GET`) ? `POST` : `GET`);
    },
    toggleHandlerType: (args, state, utils) => {
      utils.changeValue(state, `handlerType`, (handlerType) => (handlerType === `server`) ? `client` : `server`);
    }
  });

  render() {
    const {
      handleSubmit,
      formID,
      submitting,
      currentMethod,
      toggleMethod,
      currentHandlerType,
      toggleHandlerType,
    } = this.props;

    return (
      <div className={`uk-width-1-2@m`}>
        <form onSubmit={handleSubmit} id={formID}>

          <div className={`uk-card uk-card-body uk-card-default uk-text-left`}>
            <h3 className={`uk-card-title uk-position-relative`}>
              <span>Новый запрос</span>
              <Link to={`/help`}
                    className={`uk-badge secondary-background uk-position-center-right`}>?</Link>
            </h3>
            <div className={`uk-flex uk-flex-center uk-flex-column uk-child-width-1-1`}
                 uk-margin={`margin: uk-margin-top`}>
              <div className={`uk-flex`}>
                <SwitchField name={`method`} firstCheckbox={{
                  initialValue: `GET`,
                  value: `GET`
                }} secondCheckbox={{
                  value: `POST`
                }} clickHandler={toggleMethod}
                             visibilityTrigger={currentMethod === `GET`} />

                <div className={`uk-width-expand`}>
                  <Field name={`link`} disabled={submitting} type={`text`} icon={`forward`}
                         placeholder={`http://example.com/login/${(currentMethod === `GET`) ? `?foo=bar&bar=foo` : ``}`}
                         validate={linkValidator} autofocus={false}>
                    {createInput}
                  </Field>
                </div>
              </div>

              {(() => {
                if (currentMethod === `GET`) {
                  return undefined;
                }

                return (
                  <FlexGroup>
                    <Field name={`body`} disabled={submitting} type={`text`} icon={`link`}
                           placeholder={`foo=bar&bar=foo`}>
                      {createInput}
                    </Field>
                  </FlexGroup>
                );
              })()}

              <ul className={`uk-margin-remove-bottom`} uk-accordion={``}>
                <li>
                  <a className={`uk-accordion-title uk-text-secondary`} href={`#`}>Дополнительно</a>
                  <div className={`uk-accordion-content`}>
                    <FlexM>
                      <div className={`uk-width-1-1`} uk-margin={``}>
                        <SwitchField className={`uk-width-expand`} name={`handlerType`}
                                     firstCheckbox={{
                                       initialValue: `server`,
                                       value: `server`,
                                       label: `Server side`
                                     }}
                                     secondCheckbox={{
                                       value: `client`,
                                       label: `Client side`
                                     }}
                                     clickHandler={toggleHandlerType}
                                     visibilityTrigger={currentHandlerType === `server`} />


                        <Field name={`headers`} disabled={submitting} type={`text`} icon={`cog`}
                               placeholder={`{\n  "accept": "application/json"\n}`}
                               validate={headersValidator} textarea={3} className={`json-textarea`}>
                          {createInput}
                        </Field>
                        <div className={`uk-flex`}>
                          <div className={`uk-width-expand`}>
                            <Field name={`redirectTo`} disabled={submitting} type={`text`}
                                   icon={`future`}
                                   placeholder={`http://example.com/main/`}>
                              {createInput}
                            </Field>
                          </div>
                        </div>
                      </div>
                      <FlexM>
                        <div>
                          <label>
                            <Field initialValue={true} name={`credentials`} component={`input`}
                                   type={`checkbox`}
                                   className={`uk-checkbox`} />
                            {` `}Credentials
                          </label>
                        </div>
                        {
                          (currentHandlerType && currentHandlerType !== `server`) ? (
                            <div>
                              <label>
                                <Field initialValue={true} name={`noCorsMode`} component={`input`}
                                       type={`checkbox`}
                                       className={`uk-checkbox`} />
                                {` `}No-cors
                              </label>
                            </div>
                          ) : undefined
                        }
                        <div>
                          <label>
                            <Field initialValue={true} name={`shortLink`} component={`input`}
                                   type={`checkbox`}
                                   className={`uk-checkbox`} />
                            {` `}Короткая ссылка
                          </label>
                        </div>
                      </FlexM>
                    </FlexM>
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </form>
      </div>
    );
  }
}

SendInputs.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  formID: PropTypes.string.isRequired,
  currentMethod: PropTypes.string.isRequired,
  toggleMethod: PropTypes.func.isRequired,
  currentHandlerType: PropTypes.string.isRequired,
  toggleHandlerType: PropTypes.func.isRequired,
};

export default SendInputs;
