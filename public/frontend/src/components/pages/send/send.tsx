import React, {useEffect, useState} from "react";
import SpinnerWrapper from "#components/reusable/spinner-wrapper/spinner-wrapper";
import UuidSend from "#components/pages/send/uuid-send";
import TokenSend from "#components/pages/send/token-send";
import isUndefined from "#src/js/core/functions/is-undefined";

interface Props {
  payload: string
}

enum SendMode {
  TOKEN = `token`,
  UUID = `uuid`
}

const Send: React.FC<Props> = (props) => {
  const {payload} = props;

  const [sendMode, setSendMode] = useState<SendMode>(undefined);

  // Определение, токен или uuid в payload
  useEffect(() => {
    if (payload) {
      setSendMode(
        (payload?.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/))
          ? SendMode.UUID
          : SendMode.TOKEN
      );
    }
  }, [payload]);

  return (
    <div className={`uk-height-1-1 uk-flex uk-flex-center`}>
      <SpinnerWrapper ratio={`5`} loading={isUndefined(payload) || isUndefined(sendMode)}
                      className={`uk-padding uk-flex uk-flex-middle uk-flex-column`}>
        {
          (sendMode === SendMode.UUID)
            ? <UuidSend uuid={payload}/>
            : <TokenSend token={payload}/>
        }
      </SpinnerWrapper>
    </div>
  );
};

export default Send;
