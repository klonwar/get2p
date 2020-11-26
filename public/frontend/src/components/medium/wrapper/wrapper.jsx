import React from "react";
import Header from "#components/medium/header/header";
import PropTypes from "prop-types";

const Wrapper = (props) => {
  const {children} = props;
  return (
    <>
      <Header/>

      <div>
        {children}
      </div>
    </>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default Wrapper;
