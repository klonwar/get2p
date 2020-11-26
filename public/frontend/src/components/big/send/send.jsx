import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {addToFavorite, highlightJSON, StorageHelper} from "#src/js/functions";
import {decrypt} from "#src/js/crypto";
import {connect} from "react-redux";
import {favoriteSelector, responseCodeSelector, responseMessageSelector, tokensSelector} from "#src/js/redux/selectors";
import SpinnerWrapper from "#components/medium/spinner-wrapper/spinner-wrapper";
import PropTypes from "prop-types";
import {SendActions} from "#src/js/redux/reducers/slices/send-slice";
import {faviconsSelector} from "#src/js/redux/selectors";
import {Operations} from "#src/js/redux/operations";
import FavoriteButton from "#components/small/favorite-button/favorite-button";
import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";
import {UuidActions} from "#src/js/redux/reducers/slices/uuid-slice";
import {isUndefined} from "uikit/src/js/util";
import {err} from "#src/js/logger";

const fromToken = (token) => {
  if (!token) {
    return {error: `Вы не указали токен`};
  }

  let data;
  try {
    data = decrypt(token);
  } catch (e) {
    return {error: `Перегенерируйте токен`};
  }

  if (data.headers) {
    try {
      data.headers = JSON.parse(data.headers);
    } catch (e) {
      return {error: `Хэдеры должны быть в JSON`};
    }
  }

  if (data.credentials) {
    data.credentials = `include`;
  } else {
    data.credentials = undefined;
  }

  return data;
};

const renderCodeLabel = (code) => {
  if (code < 0) {
    return <h1 className={`uk-margin-remove`}>???</h1>;
  }

  let className = `uk-text-success`;
  if (code >= 300) {
    className = `uk-text-primary`;
  }
  if (code >= 400) {
    className = `uk-text-warning`;
  }
  if (code >= 500) {
    className = `uk-text-danger`;
  }

  return <h1 className={className + ` uk-margin-remove`}>{code}</h1>;
};

const Send = (props) => {
  const location = useLocation();
  const {code, message, favicons, favorite, tokensFromUUID} = props;
  const {sendRequest, clearResponse, getFavicon, getToken, removeToken} = props;

  const [error, setError] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [uuid, setUuid] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  const [responseCode, setResponseCode] = useState(undefined);
  const [originHref, setOriginHref] = useState(``);
  const [faviconSrc, setFaviconSrc] = useState(``);
  const [handlerType, setHandlerType] = useState(`server`);
  const [method, setMethod] = useState(`GET`);

  // В самом начале получение токена и uuid из url
  useEffect(() => {
    const tokenFromUrl = (new URLSearchParams(location.search)).get(`token`);
    const uuidFromUrl = (new URLSearchParams(location.search)).get(`uuid`);

    setToken(tokenFromUrl || ``);
    setUuid(uuidFromUrl || ``);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Проверим на ошибки
  useEffect(() => {
    if ((!token && !isUndefined(token)) && (!uuid && !isUndefined(uuid))) {
      setError(`No token or uuid`);
    }
  }, [token, uuid, setError]);

  // Если есть токен, но нет uuid-a, то проверим его
  useEffect(() => {
    if (token) {
      setError(fromToken(token).error || false);
    }
  }, [token]);

  // Отправялем запрос на получение токена из uuid (если не задан конкретный token)
  useEffect(() => {
    if (!token && uuid) {
      getToken(uuid);
    }
  }, [token, uuid, getToken]);

  // Обрабатываем ответ из предыдущего запроса, если токен еще не установили
  useEffect(() => {
    if (!token && uuid && tokensFromUUID?.[uuid]) {
      setToken(tokensFromUUID[uuid].token);
      const uuidError = tokensFromUUID[uuid].error;
      setError(isUndefined(uuidError) ? false : uuidError);
      // removeToken(uuid);
    }
  }, [tokensFromUUID, uuid, removeToken, token]);

  // Получение фавиконки при существующем токене
  useEffect(() => {
    if (!isUndefined(error) && !error && token) {
      console.log(error);
      const sendProps = fromToken(token);
      const url = new URL(sendProps.link);
      const {protocol, hostname} = url;

      if (!faviconSrc) {
        getFavicon(protocol, hostname);
      }

      setFaviconSrc(favicons?.[hostname] || StorageHelper.favicons.get(hostname)?.data || ``);
    }
  }, [error, favicons, token, faviconSrc, getFavicon]);

  // Изменим надпись "Client" на "Server" или наоборот
  useEffect(() => {
    if (token) {
      const sendProps = fromToken(token);
      setHandlerType(sendProps.handlerType);
      setMethod(sendProps.error);
    }
  }, [favicons, token, faviconSrc, getFavicon]);

  // Если нет ошибок - выполняем sendRequest
  useEffect(() => {
    if (!isUndefined(error) && !error) {
      const sendProps = fromToken(token);
      const url = new URL(sendProps.link);
      const {hostname, protocol} = url;

      setOriginHref(sendProps.redirectTo || protocol + hostname);

      sendRequest({token, ...sendProps});
    }
  }, [error, token, sendRequest]);

  // Если получчили ответ - запишем его в state
  useEffect(() => {
    if (message) {
      let jsonMessage;
      try {
        jsonMessage = JSON.stringify(JSON.parse(message), null, 2);
      } catch (e) {
        jsonMessage = message;
      }
      if (jsonMessage) {
        jsonMessage = highlightJSON(jsonMessage);
      }

      setResponse(jsonMessage);
      setResponseCode(code);
      clearResponse();
    }
  }, [message, clearResponse, code]);

  return (
    <div className={`uk-height-1-1 uk-flex uk-flex-center`}>
      <SpinnerWrapper ratio={`5`} loading={!responseCode && !response && !error || isUndefined(error)}
                      isError={error} errorText={error}
                      className={`uk-padding uk-flex uk-flex-middle uk-flex-column`}>
        {renderCodeLabel(responseCode)}
        <div className={`uk-margin-remove uk-text-muted`}>
          <span>{(handlerType === `client`) ? `Client` : `Server`}</span>
          {` `}
          <div className={`uk-position-relative`} style={{display: `inline`}}>
            <span className={`method-span`}>{method}</span>
            <span>--&gt;</span>
          </div>
          {` `}
          <img alt={``} className={`uk-icon-image text-img`} src={faviconSrc} />
          {` `}
          <span>--&gt;</span>
          {` `}
          <span>You</span>
        </div>
        <pre className={`code-block`} style={{userSelect: `text`}} dangerouslySetInnerHTML={{__html: response}} />
        <div>
          <Link to={`/`} className={`uk-padding-small`} uk-icon={`icon: home`} />
          <button className={`uk-padding-small`} uk-icon={`icon: refresh`} onClick={() => {
            // clearResponse();
            // requestClosure();
          }} />
          <FavoriteButton token={token} uuid={uuid} />
          <a target={`_blank`} rel={`noopener noreferrer`} href={originHref}
             className={`uk-padding-small`} uk-icon={``}>
            <img alt={``} className={`uk-icon-image`} src={faviconSrc} />
          </a>
        </div>
      </SpinnerWrapper>
    </div>
  );
};

Send.propTypes = {
  favicons: PropTypes.object,
  favorite: PropTypes.object,
  tokensFromUUID: PropTypes.object,
  code: PropTypes.number,
  message: PropTypes.string,
  sendRequest: PropTypes.func.isRequired,
  clearResponse: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  removeToken: PropTypes.func.isRequired,
  favoriteFromStorage: PropTypes.func.isRequired,
  getFavicon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  code: responseCodeSelector(state),
  tokensFromUUID: tokensSelector(state),
  message: responseMessageSelector(state),
  favicons: faviconsSelector(state),
  favorite: favoriteSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendRequest: (data) => dispatch(Operations.sendRequest(data)),
  getToken: (uuid) => dispatch(Operations.getToken({uuid})),
  removeToken: (uuid) => dispatch(UuidActions.removeToken({uuid})),
  clearResponse: () => dispatch(SendActions.clearResponse(undefined)),
  getFavicon: (protocol, domainUrl) => dispatch(Operations.getFavicon({protocol, domainUrl})),
  favoriteFromStorage: () => dispatch(FavoriteActions.favoriteFromStorage(undefined)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Send);
