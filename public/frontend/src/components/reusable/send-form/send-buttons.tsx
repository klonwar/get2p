import React from "react";
import {useForm} from "react-final-form";
import {SendFormType} from "#components/reusable/send-form/send-form";

interface Props {
  isBuffWriting: boolean,
  formID: string,
}

const SendButtons: React.FC<Props> = (props) => {
  const {
    formID,
    isBuffWriting,
  } = props;

  const form = useForm();

  const defProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    form: formID,
    type: `submit`
  };

  const favProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    ...defProps,
    onClick: () => form.change(`type`, SendFormType.FAVORITE),
  };

  const buffProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    ...defProps,
    onClick: () => form.change(`type`, SendFormType.CLIPBOARD),
    disabled: !window.isSecureContext,
    ...((isBuffWriting) ? {style: {backgroundColor: `#8BC34A`}} : {})
  };

  const sendProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    ...defProps,
    onClick: (e) => {
      form.change(`type`, SendFormType.SEND);
      if (e.ctrlKey) {
        form.change(`type`, SendFormType.SEND_NEW_WINDOW);
      }
    },
    onMouseDown: (e) => {
      if (e.button === 1) {
        form.change(`type`, SendFormType.SEND_NEW_WINDOW);
        form.submit();
      }
    }
  };

  return (
    <>
      <button {...sendProps} className={`uk-button uk-button-default`}>
        Отправить
      </button>

      <button {...favProps} className={`uk-button uk-button-default uk-position-relative`}>
        В избранное
      </button>

      <button {...buffProps} className={`uk-button uk-button-default uk-position-relative`}>
        <span className={((isBuffWriting) ? `uk-invisible` : ``)}>
            В буфер обмена
        </span>
        <span className={`${((!isBuffWriting) ? `uk-invisible` : ``)} uk-position-center`}
              uk-icon={`icon: check`}/>
      </button>
    </>
  );
};


export default SendButtons;
