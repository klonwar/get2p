import React, {FC, useEffect} from "react";
import SwitchField from "#components/reusable/switch-field/switch-field";
import {Field, Form} from "react-final-form";
import {createInput} from "#src/js/functions";
import {useHistory} from "react-router-dom";
import HelpItem from "#components/pages/help/help-item";
import {headersValidator} from "#src/js/core/validators";

const Help: FC = () => {
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
    <Form onSubmit={() => {
    }} render={() => (
      <div className={`uk-padding uk-padding-remove-bottom`}>
        <div className={`uk-text-center uk-flex uk-flex-column`} uk-margin={`margin: uk-margin`}>
          <HelpItem index={1} text={`Выберите метод и введите ссылку, на которую надо отправить запрос.`}>
            <>
              <SwitchField
                name={`method`}
                options={[
                  {value: `GET`},
                  {value: `POST`},
                  {value: `OPTIONS`},
                ]}
              />

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
                         options={[
                           {value: `SERVER`},
                           {value: `CLIENT`},
                         ]}/>
          </HelpItem>
          <HelpItem index={3} text={`Если хотите, можно передать дополнительные хэдеры, записанные в JSON формате`}>
            <div className={`uk-width-expand`}>
              <Field name={`headers`} type={`text`} icon={`cog`}
                     placeholder={`{\n  "accept": "application/json"\n}`}
                     validate={headersValidator} textarea={3} className={`json-textarea`}>
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
    )}/>
  );
};

export default Help;
