import React from "react";

interface Props {
  loading: boolean,
  onClick?: () => void,
  ratio?: string,
  errorIcon?: string,
  isError?: boolean | string,
  errorText?: boolean | string,
  className?: string
}

const SpinnerWrapper: React.FC<Props> = (props) => {
  const {
    ratio = `1`,
    className = ``,
    children = undefined,
    loading,
    isError = false,
    onClick = () => {},
    errorIcon = `close`,
    errorText = ``,
  } = props;

  return (
    <>
      <span className={`uk-position-center uk-overflow-hidden ${(!loading) ? `uk-invisible` : ``}`}
            uk-spinner={`ratio: ${ratio}`}/>
      <div className={`uk-flex uk-flex-column uk-flex-middle uk-position-center${(!isError) ? ` uk-hidden` : ``}`}>
        <button className={`uk-button`}
                onClick={onClick} uk-icon={`icon: ${errorIcon}; ratio: ${ratio}`}/>
        <span>{errorText}</span>
      </div>
      <div className={`${(loading || isError) ? `uk-invisible` : ``} ${className}`}>
        {children}
      </div>
    </>

  );
};


export default SpinnerWrapper;
