import React, {useEffect} from "react";
import SwitchField from "#components/small/switch-field/switch-field";
import {Field, Form} from "react-final-form";
import PropTypes from "prop-types";
import {createInput} from "#src/js/functions";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

const HelpItem = (props) => {
  const {index, text} = props;
  return (
    <div className={`uk-child-width-1-1 uk-child-width-expand@m`} uk-grid={``}>
      <div className={`uk-flex uk-flex-middle uk-flex-center uk-text-left uk-width-auto@m`}>
        <h1>{index}.</h1>
      </div>
      <div className={`uk-flex uk-flex-middle uk-flex-center`}>
        <div className={`uk-flex uk-width-expand uk-width-expand`}>
          {props.children}
        </div>
      </div>
      <div className={`uk-flex uk-flex-middle uk-flex-center uk-text-left`} style={{whiteSpace: `pre-wrap`}}>
        {text}
      </div>
    </div>
  );
};

HelpItem.propTypes = {
  children: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

const Help = (props) => {
  const history = useHistory();
  const escFunction = (e) => {
    if (e.keyCode === 27) {
      history.goBack();
    }
  };
  useEffect(() => {
    document.addEventListener(`keydown`, escFunction, false);
    return () => document.removeEventListener(`keydown`, escFunction, false);
    // eslint-disable-next-line
  }, []);
  return (
    <Form onSubmit={() => {}} render={() => (
      <div className={`uk-padding uk-padding-remove-bottom`}>
        <div className={`uk-text-center uk-flex uk-flex-column`} uk-margin={`margin: uk-margin`}>
          <HelpItem index={1} text={`Выберите метод и введите ссылку, на которую надо отправить запрос.`}>
            <>
              <SwitchField name={`method`} firstCheckbox={{
                initialValue: `GET`,
                value: `GET`
              }} secondCheckbox={{
                value: `POST`
              }} clickHandler={() => {}} visibilityTrigger={true} />

              <div className={`uk-width-expand`}>
                <Field name={`link`} type={`text`} icon={`forward`}
                       placeholder={`http://example.com/login/?foo=bar&bar=foo`}>
                  {createInput}
                </Field>
              </div>
            </>
          </HelpItem>
          <HelpItem index={2} text={
            `Запрос со стороны сервера может быть полезен, если ваша цель - получить ответ от сайта. \n` +
            `Client side с включенным "no-cors" не дает получить ответ, но можно, например, ` +
            `POST-запросом залогиниться на каком-то сервисе\n` +
            `Если выключить "no-cors", то некоторые сайты будут блокировать ваш запрос`
          }>
            <SwitchField className={`uk-width-expand uk-margin-remove`} name={`handlerType`}
                         firstCheckbox={{
                           initialValue: `server`,
                           value: `server`,
                           label: `Server side`
                         }}
                         secondCheckbox={{
                           value: `client`,
                           label: `Client side`
                         }}
                         clickHandler={() => {}}
                         visibilityTrigger={true} />
          </HelpItem>
          <HelpItem index={3} text={`Если хотите, можно передать дополнительные хэдеры, записанные в JSON формате`}>
            <div className={`uk-width-expand`}>
              <Field name={`headers`} type={`text`} icon={`cog`}
                     placeholder={`{"accept": "application/json"}`}>
                {createInput}
              </Field>
            </div>
          </HelpItem>
          <HelpItem index={4} text={`После получения ответа от сайта, можно совершить переход по указанной ссылке`}>
            <div className={`uk-width-expand`}>
              <Field name={`redirectTo`} type={`text`}
                     icon={`future`}
                     placeholder={`http://example.com/main/`}>
                {createInput}
              </Field>
            </div>
          </HelpItem>
          <div className={`uk-width-expand uk-flex uk-flex-center`}>
            <span>Нажмите ESC или{` `} <a onClick={() => history.goBack()}>сюда</a>, чтобы вернуться</span>
          </div>
        </div>
      </div>
    )} />
  );
};

export default Help;
