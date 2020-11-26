import React from "react";
import PropTypes from "prop-types";

const SpinnerWrapper = (props) => {
  const {
    ratio = `1`,
    className = ``,
    children = undefined,
    relative,
    loading,

    isError = false,
    errorHandler = () => {},
    errorIcon = `close`,
    errorText = ``,
  } = props;

  const inner = (
    <>
      <span className={`uk-position-center ${(!loading) ? `uk-invisible` : ``}`} uk-spinner={`ratio: ${ratio}`} />
      <div className={`uk-flex uk-flex-column uk-flex-middle uk-position-center${(!isError) ? ` uk-hidden` : ``}`}>
        <button className={`uk-button`}
                onClick={errorHandler} uk-icon={`icon: ${errorIcon}; ratio: ${ratio}`} />
        <span>{errorText}</span>
      </div>
      <div className={`${(loading || isError) ? `uk-invisible` : ``} ${className}`}>
        {children}
      </div>
    </>

  );

  return (!relative) ? inner : <div className={`uk-position-relative`}>{inner}</div>;
};

SpinnerWrapper.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  relative: PropTypes.bool,
  errorHandler: PropTypes.func,
  ratio: PropTypes.string,
  errorIcon: PropTypes.string,
  isError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  errorText: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  className: PropTypes.string
};

export default SpinnerWrapper;
