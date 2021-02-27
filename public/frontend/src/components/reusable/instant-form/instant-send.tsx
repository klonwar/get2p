import React, {FC} from "react";
import {instantTokenStringSelector} from "#src/js/redux/selectors";
import {useSelector} from "react-redux";
import Send from "#components/pages/send/send";

const InstantSend: FC = () => {
  const instantTokenString = useSelector(instantTokenStringSelector);

  return (
    <Send payload={instantTokenString}/>
  );
};

export default InstantSend;
