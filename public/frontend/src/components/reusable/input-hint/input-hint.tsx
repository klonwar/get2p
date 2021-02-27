import React from "react";

interface Props {
  className?: string,
  text: string
}

const InputHint: React.FC<Props> = (props) => {
  const {className = ``, text} = props;

  return (
    <span className={`uk-position-absolute uk-overlay uk-padding-small ${className}`}>
        <div className={`uk-flex uk-flex-middle uk-height-1-1`}>
          <span className={`input-hint uk-active`}>
            {text}
          </span>
        </div>
      </span>
  );
};


export default InputHint;
