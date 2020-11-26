import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <div className={`uk-width-auto uk-flex uk-flex-center uk-padding-small uk-padding-remove-horizontal`}>
      <NavLink activeClassName={`uk-card-default active`} exact to={`/`} className={`uk-padding-small`} uk-icon={`icon: home`} />
      <NavLink activeClassName={`uk-card-default active`} exact to={`/instant`} className={`uk-padding-small`} uk-icon={`icon: bolt`} />
    </div>
  );
};

export default Header;
