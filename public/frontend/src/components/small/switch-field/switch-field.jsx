import React from "react";
import PropTypes from "prop-types";
import {Field} from "react-final-form";

const SwitchField = (props) => {
  const {clickHandler, visibilityTrigger, firstCheckbox, secondCheckbox, name, className = ``, ...rest} = props;

  const firstLabel = (firstCheckbox.label) ? firstCheckbox.label : firstCheckbox.value + ``;
  const secondLabel = (secondCheckbox.label) ? secondCheckbox.label : secondCheckbox.value + ``;

  const secondLonger = (firstLabel.length < secondLabel.length);
  const firstLonger = (firstLabel.length >= secondLabel.length);

  const placeholder = (firstLonger) ? firstLabel : secondLabel;

  return (
    <>
      <div className={`uk-hidden`}>
        <Field {...firstCheckbox} name={name} component={`input`} type={`checkbox`} />
        <Field {...secondCheckbox} name={name} component={`input`} type={`checkbox`} />
      </div>

      <button
        className={`${className} uk-position-relative uk-height-auto uk-flex uk-flex-middle uk-flex-center uk-button uk-button-secondary uk-padding-remove uk-margin-small-right`}
        onClick={clickHandler} type={`button`} {...rest}>
        <div>
          <span uk-icon={`icon:  chevron-left`} />
          <span className={`uk-invisible`}>{placeholder}</span>
          <span uk-icon={`icon:  chevron-right`} />
        </div>
        <div className={`uk-position-center`}>
          <span>{(visibilityTrigger) ? firstLabel : secondLabel}</span>
        </div>
      </button>
    </>
  );
};

SwitchField.propTypes = {
  firstCheckbox: PropTypes.object.isRequired,
  secondCheckbox: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
  visibilityTrigger: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  form: PropTypes.string,
  className: PropTypes.string
};

export default SwitchField;
