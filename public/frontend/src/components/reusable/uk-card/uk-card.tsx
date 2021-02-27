import React from "react";
import {darkThemeSettingSelector} from "#src/js/redux/selectors";
import {useSelector} from "react-redux";

interface Props {
  className?: string
}

const UKCard: React.FC<Props> = (props) => {
  const {
    children,
    className = ``
  } = props;

  const darkTheme = useSelector(darkThemeSettingSelector);

  return (
    <div
      className={`uk-card uk-card-body uk-text-left ${(darkTheme) ? `uk-card-secondary uk-light` : `uk-card-default uk-dark`} ${className}`}>
      {children}
    </div>
  );
};

export default UKCard;