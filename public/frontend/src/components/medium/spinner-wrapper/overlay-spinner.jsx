import SpinnerWrapper from "#components/medium/spinner-wrapper/spinner-wrapper";
import PropTypes from "prop-types";
import React from "react";

const OverlaySpinner = (props) => {
  const {className = ``} = props;
  return (
    <div {...props} className={`overlay-spinner uk-width-1-1 uk-height-1-1 uk-position-absolute uk-position-top-left ${className}`}>
      <SpinnerWrapper loading={true} ratio={`6`} />
    </div>
  );
};

OverlaySpinner.propTypes = {
  className: PropTypes.string
};

export default OverlaySpinner;
