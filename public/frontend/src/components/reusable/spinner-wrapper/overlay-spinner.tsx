import SpinnerWrapper from "#components/reusable/spinner-wrapper/spinner-wrapper";
import React, {FC} from "react";

interface Props {
  className?: string,
  style?: React.CSSProperties
}

const OverlaySpinner: FC<Props> = (props) => {
  const {className = ``, ...restProps} = props;
  return (
    <div {...restProps}
         className={`overlay-spinner uk-width-1-1 uk-height-1-1 uk-position-absolute uk-position-top-left ${className}`}>
      <SpinnerWrapper loading={true} ratio={`6`}/>
    </div>
  );
};

export default OverlaySpinner;
