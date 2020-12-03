import ChildrenDuplicator from "#components/small/children-duplicator/children-duplicator";
import React from "react";
import PropTypes from "prop-types";
import SendForm from "#components/medium/send-form/send-form";

class SendButtons extends React.PureComponent {
  static getFormMutators = () => ({
    toggleRedirect: (args, state, utils) => {
      utils.changeValue(state, `redirect`, (redirect) => !redirect);
    },
  });

  render() {
    const {
      changeFormType,
      formID,
      isBuffWritting,
      handleSubmit
    } = this.props;

    return (
      <ChildrenDuplicator
        firstProps={{
          "className": `uk-width-1-4@m uk-flex uk-flex-column uk-flex-around uk-visible@m`,
          "uk-margin": ``
        }}
        secondProps={{
          "className": `uk-width-1-4@m uk-flex uk-flex-between uk-hidden@m`,
          "uk-margin": ``
        }}
      >
        <div>
          <button type={`submit`} form={formID} onClick={(e) => {
            changeFormType(`send`);
            if (e.ctrlKey) {
              changeFormType(`send-new-window`);
            }
          }} onMouseDown={(e) => {
            if (e.button === 1) {
              changeFormType(`send-new-window`);
              handleSubmit();
            }
          }} className={`uk-button uk-button-primary`}>
                        <span className={`uk-visible@s`}>
                          Отправить
                        </span>
            <span className={`uk-hidden@s`} uk-icon={`icon: forward`} />
          </button>
        </div>
        <div>
          <button type={`submit`} form={formID} onClick={() => {
            changeFormType(`favorite`);
          }} className={`uk-button uk-position-relative`}>
                        <span className={`uk-visible@s`}>
                          В избранное
                        </span>
            <span className={`uk-hidden@s`} uk-icon={`icon: star`} />
          </button>
        </div>
        <div>
          <button type={`submit`} form={formID} disabled={!window.isSecureContext} onClick={() => {
            changeFormType(`clipboard`);
          }}
                  className={`uk-button uk-position-relative`} {...((isBuffWritting) ? {style: {backgroundColor: `#8BC34A`}} : {})}>
                        <span className={((isBuffWritting) ? `uk-invisible` : ``)}>
                          <span className={`uk-visible@s`}>
                          В буфер обмена
                        </span>
                        <span className={`uk-hidden@s`} uk-icon={`icon: pull`} />
                        </span>
            <span className={`${((!isBuffWritting) ? `uk-invisible` : ``)} uk-position-center`}
                  uk-icon={`icon: check`} />
          </button>
        </div>
      </ChildrenDuplicator>
    );
  }
}

SendButtons.propTypes = {
  changeFormType: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formID: PropTypes.string.isRequired,
  isBuffWritting: PropTypes.bool.isRequired,
};

export default SendButtons;
