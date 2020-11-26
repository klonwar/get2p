import PropTypes from "prop-types";
import React from "react";

const FlexGroup = (props) => <div
  className={`uk-flex uk-width-1-1 uk-flex-center uk-flex-column uk-child-width-1-1`}
  uk-margin={`margin: uk-margin-top`}>{props.children}</div>;

FlexGroup.propTypes = {
  children: PropTypes.node
};

export default FlexGroup;
