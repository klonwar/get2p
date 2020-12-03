import React from "react";
import PropTypes from "prop-types";
import {instantTokenSelector} from "#src/js/redux/selectors";
import {connect} from "react-redux";
import Send from "#components/big/send/send";

const InstantSend = (props) => {
  const {instantToken} = props;
  return (
    <Send payload={instantToken} />
  );
};

InstantSend.propTypes = {
  instantToken: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  instantToken: instantTokenSelector(state)
});

export default connect(mapStateToProps)(InstantSend);
