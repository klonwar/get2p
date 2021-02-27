import React, {FC} from "react";

interface Props {
  index: number,
  text: string
}

const HelpItem: FC<Props> = (props) => {
  const {index, text} = props;
  return (
    <div className={`uk-child-width-1-1 uk-child-width-expand@m`} uk-grid={``}>
      <div className={`uk-flex uk-flex-middle uk-flex-center uk-text-left uk-width-auto@m`}>
        <h1>{index}.</h1>
      </div>
      <div className={`uk-flex uk-flex-middle uk-flex-center`}>
        <div className={`uk-flex uk-width-expand uk-width-expand`}>
          {props.children}
        </div>
      </div>
      <div className={`uk-flex uk-flex-middle uk-flex-center uk-text-left`} style={{whiteSpace: `pre-wrap`}}>
        {text}
      </div>
    </div>
  );
};

export default HelpItem;