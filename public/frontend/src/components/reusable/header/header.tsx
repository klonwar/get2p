import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {darkThemeSettingSelector} from "#src/js/redux/selectors";

const Header: React.FC = () => {
  const darkTheme = useSelector(darkThemeSettingSelector);
  const activeClassName = `active ${(darkTheme) ? `uk-card-secondary` : `uk-card-default`}`;

  return (
    <div className={`uk-width-auto uk-flex uk-flex-center uk-padding-small uk-padding-remove-horizontal`}>
      <NavLink activeClassName={activeClassName} exact to={`/`} className={`uk-padding-small`} uk-icon={`icon: home`} />
      <NavLink activeClassName={activeClassName} exact to={`/instant`} className={`uk-padding-small`} uk-icon={`icon: bolt`} />
      <NavLink activeClassName={activeClassName} exact to={`/settings`} className={`uk-padding-small`} uk-icon={`icon: cog`} />
    </div>
  );
};

export default Header;
