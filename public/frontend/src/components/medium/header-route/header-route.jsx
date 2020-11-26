import React from "react";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import Wrapper from "#components/medium/wrapper/wrapper";

const HeaderRoute = (props) => {
  const {children, path} = props;

  return (
    <Route path={path}>
      <Wrapper>
        {children}
      </Wrapper>
    </Route>
  );
};

HeaderRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired
};

export default HeaderRoute;
