import {Link} from "react-router-dom";
import SwitchField from "#components/reusable/switch-field/switch-field";
import {Field, FormSpy, useFormState} from "react-final-form";
import {headersValidator, linkValidator} from "#src/js/core/validators";
import {createInput} from "#src/js/functions";
import React from "react";
import {SendFormData} from "#components/reusable/send-form/send-form";
import {HandlerTypeEnum, MethodEnum} from "#server/src/model/token";
import {connect} from "react-redux";
import {accordionAlwaysOpenedSettingSelector} from "#src/js/redux/selectors";

const mapStateToProps = (state) => ({
  accordionAlwaysOpened: accordionAlwaysOpenedSettingSelector(state)
});

interface Props extends ReturnType<typeof mapStateToProps>{
  formID: string,
  onChange?: (data: { values: SendFormData }) => void,
  onSubmit?: () => void
}

const SendInputs: React.FC<Props> = (props) => {
  const {
    formID,
    onChange = () => {},
    onSubmit = () => {},
    accordionAlwaysOpened
  } = props;
  const {values, submitting} = useFormState<SendFormData>();

  return (
    <form onSubmit={onSubmit} id={formID}>
      <FormSpy subscription={{values: true}} onChange={onChange}/>
      <div className={`uk-card-title uk-position-relative uk-h3`}>
        <span>Новый запрос</span>
        <Link to={`/help`}
              className={`uk-badge secondary-background uk-position-center-right`}>?</Link>
      </div>

      <div className={`uk-flex uk-flex-center uk-flex-column uk-child-width-1-1`}
           uk-margin={`margin: uk-margin-top`}>
        <div uk-margin={``}>
          <div className={`uk-flex@s`} uk-margin={``}>
            <SwitchField
              name={`method`}
              options={[
                {
                  label: `GET`,
                  value: MethodEnum.GET
                }, {
                  label: `POST`,
                  value: MethodEnum.POST
                }, {
                  label: `OPTIONS`,
                  value: MethodEnum.OPTIONS
                }
              ]}
              className={`uk-width-1-1 uk-width-auto@s`}
            />

            <div className={`uk-width-expand`}>
              <Field name={`link`} disabled={submitting} type={`text`} icon={`forward`}
                     placeholder={`http://example.com/login/${(values.method === MethodEnum.GET) ? `?foo=bar&bar=foo` : ``}`}
                     validate={linkValidator} autofocus={false}>
                {createInput}
              </Field>
            </div>
          </div>

          {(values.method === MethodEnum.POST)
            ? (
              <div className={`uk-flex uk-width-1-1 uk-flex-center uk-flex-column uk-child-width-1-1`}
                   uk-margin={`margin: uk-margin-top`}>
                <Field name={`body`} disabled={submitting} type={`text`} icon={`link`}
                       placeholder={`foo=bar&bar=foo`}>
                  {createInput}
                </Field>
              </div>
            )
            : undefined
          }
        </div>

        <ul className={`uk-margin-remove-bottom`} uk-accordion={``}>
          <li className={(accordionAlwaysOpened) ? `uk-open` : ``}>
            <a className={`uk-accordion-title uk-text-secondary`} href={`#`}>Дополнительно</a>
            <div className={`uk-accordion-content`}>
              <div className={`uk-flex uk-width-1-1 uk-flex-center uk-flex-column uk-child-width-1-1`}
                   uk-margin={`margin: uk-margin-top`}>
                <div className={`uk-width-1-1`} uk-margin={``}>
                  <SwitchField className={`uk-width-expand`} name={`handlerType`}
                               options={[{value: HandlerTypeEnum.SERVER}, {value: HandlerTypeEnum.CLIENT}]}
                  />


                  <Field name={`headers`} disabled={submitting} type={`text`} icon={`cog`}
                         placeholder={`{\n  "accept": "application/json"\n}`}
                         validate={headersValidator} textarea={3} className={`json-textarea`}>
                    {createInput}
                  </Field>

                  <Field name={`redirectTo`} disabled={submitting} type={`text`}
                         icon={`future`}
                         placeholder={`http://example.com/main/`}
                         className={`uk-width-expand`}>
                    {createInput}
                  </Field>
                </div>
                <div className={`uk-width-1-1 uk-flex-center uk-flex-column uk-child-width-1-1 uk-text-right`}
                     uk-margin={``}>

                  <label style={{display: `block`}}>
                    <Field initialValue={true} name={`credentials`} component={`input`}
                           type={`checkbox`}
                           className={`uk-checkbox`}/>
                    {` `}Credentials
                  </label>

                  {
                    (values.handlerType === HandlerTypeEnum.CLIENT) ? (
                      <label style={{display: `block`}}>
                        <Field initialValue={true} name={`noCorsMode`} component={`input`}
                               type={`checkbox`}
                               className={`uk-checkbox`}/>
                        {` `}No-cors
                      </label>
                    ) : undefined
                  }
                  <label style={{display: `block`}}>
                    <Field initialValue={true} name={`shortLink`} component={`input`}
                           type={`checkbox`}
                           className={`uk-checkbox`}/>
                    {` `}Короткая ссылка
                  </label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default connect(mapStateToProps)(SendInputs);
