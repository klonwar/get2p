import React from "react";
import PropTypes from "prop-types";

const InputHint = (props) => {
  const {className = ``, text} = props;

  return (
    <span className={`uk-position-absolute uk-overlay uk-padding-small ${className}`}>
        <div className={`uk-flex uk-flex-middle uk-height-1-1`}>
          <span className={`input-hint uk-active`}>
            {text}
          </span>
        </div>
      </span>
  );
};

InputHint.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default InputHint;
