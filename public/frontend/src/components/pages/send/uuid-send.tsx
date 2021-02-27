import React, {useEffect} from "react";
import {tokensFromUuidsSelector} from "#src/js/redux/selectors";
import {Operations} from "#src/js/redux/operations/operations";
import SpinnerWrapper from "#components/reusable/spinner-wrapper/spinner-wrapper";
import TokenSend from "#components/pages/send/token-send";
import {connect} from "react-redux";
import isUndefined from "#src/js/core/functions/is-undefined";

const mapStateToProps = (state) => ({
  tokensFromUUID: tokensFromUuidsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  getToken: (uuid: string) => dispatch(Operations.getToken({uuid})),
});


interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  uuid: string
}

const UuidSend: React.FC<Props> = (props) => {
  const {uuid} = props;
  const {tokensFromUUID, getToken} = props;

  // Запросим с сервера токен по данному uuid
  useEffect(() => {
    if (uuid) {
      getToken(uuid);
    }
  }, [uuid, getToken]);

  return (
    <div className={`uk-height-1-1 uk-flex uk-flex-center`}>
      <SpinnerWrapper ratio={`5`} loading={isUndefined(uuid) || isUndefined(tokensFromUUID[uuid]?.token)}
                      isError={!isUndefined(tokensFromUUID[uuid]?.ok) && !tokensFromUUID[uuid]?.ok}
                      errorText={tokensFromUUID[uuid]?.error}
                      className={`uk-flex uk-flex-middle uk-flex-column`}>
        <TokenSend token={tokensFromUUID[uuid]?.token} uuid={uuid}/>
      </SpinnerWrapper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UuidSend);