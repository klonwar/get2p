import {Token} from "#server/src/model/token";
import React, {useEffect, useState} from "react";
import {
  faviconsSelector,
  favoriteSelector,
  responseCodeSelector,
  responseCookiesSelector,
  responseMessageSelector
} from "#src/js/redux/selectors";
import {Operations} from "#src/js/redux/operations/operations";
import {SendActions} from "#src/js/redux/reducers/slices/send-slice";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SpinnerWrapper from "#components/reusable/spinner-wrapper/spinner-wrapper";
import CodeBlock from "#components/reusable/code-block/code-block";
import FavoriteButton from "#components/reusable/favorite-button/favorite-button";
import isUndefined from "#src/js/core/functions/is-undefined";

const renderCodeLabel = (code: number): JSX.Element => {
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

  return <h1 className={`${className} uk-margin-remove`}>{code}</h1>;
};

const mapStateToProps = (state) => ({
  code: responseCodeSelector(state),
  message: responseMessageSelector(state),
  favicons: faviconsSelector(state),
  favorite: favoriteSelector(state),
  responseCookies: responseCookiesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendRequest: (token: Token) => dispatch(Operations.sendRequest({token})),
  requestFavicon: (protocol: string, domainUrl: string) => dispatch(Operations.requestFavicon({protocol, domainUrl})),
});

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps>, RouteComponentProps {
  token: string,
  uuid?: string
}

const TokenSend: React.FC<Props> = (props) => {
  const {token: tokenString, uuid} = props;
  const {code, message, favicons, responseCookies} = props;
  const {sendRequest, requestFavicon} = props;

  const [error, setError] = useState<string | boolean | undefined>(undefined);
  const [token, setToken] = useState<Token>(undefined);
  const [response, setResponse] = useState<string>(undefined);
  const [responseCode, setResponseCode] = useState<number>(undefined);
  const [originHref, setOriginHref] = useState(``);
  const [faviconSrc, setFaviconSrc] = useState(``);

  // Получаем с сервера при ответе
  // todo куда-нибудь пристроить
  const [cookies, setCookies] = useState<Array<string>>(undefined);

  // При изменении строки токена надо обнулить текущую информацию
  useEffect(() => {
    setResponse(undefined);
    setResponseCode(undefined);
    setError(undefined);
  }, [tokenString]);

  // Проверим на ошибки и создадим экземпляр токена, если их нет
  useEffect(() => {
    if (!tokenString && !isUndefined(tokenString)) {
      setError(`Не указан токен`);
    }
    if (tokenString) {
      const tokenError = Token.findErrorsInEncryptedString(tokenString) || false;
      setError(tokenError);

      if (!tokenError) {
        setToken(Token.fromEncryptedString(tokenString));
      }
    }
  }, [tokenString]);

  // Получение фавиконки при существующем токене
  useEffect(() => {
    if (!isUndefined(error) && !error && token) {
      const url = new URL(token.link);
      const {protocol, hostname} = url;

      if (!faviconSrc) {
        requestFavicon(protocol, hostname);
      }

      setFaviconSrc(favicons?.[hostname]?.data || ``);
    }
  }, [error, favicons, token, faviconSrc, requestFavicon]);

  // Если нет ошибок - выполняем sendRequest
  useEffect(() => {
    if (!isUndefined(error) && !error && token) {
      const url = new URL(token.link);
      const {hostname, protocol} = url;

      setOriginHref(token.redirectTo || protocol + hostname);

      sendRequest(token);
    }
  }, [error, token, sendRequest]);

  // Если получили ответ - запишем его в state
  useEffect(() => {
    if (message) {
      setResponse(message);
      setResponseCode(code);
      setCookies(responseCookies);
    }
  }, [responseCookies, message, code]);

  // При получении кук с сервера выведем их в консоль
  // todo переделать на вывод куда-то на экран
  useEffect(() => {
    if (cookies) {
      let s = ``;
      for (const cookie of cookies) {
        s += cookie + `\n`;
      }
      console.log(`Куки, которые вернул сервер: \n${s}`);
    }
  }, [cookies]);

  return (
    <div className={`uk-height-1-1 uk-flex uk-flex-center`}>
      <SpinnerWrapper loading={!responseCode && !response && !error || isUndefined(error)}
                      ratio={`5`} isError={error} errorText={error}
                      className={`uk-flex uk-flex-middle uk-flex-column`}>
        {renderCodeLabel(responseCode)}
        <div className={`uk-margin-remove uk-text-muted`}>
          <span>{(token?.handlerType === `client`) ? `Client` : `Server`}</span>
          {` `}
          <div className={`uk-position-relative`} style={{display: `inline`}}>
            <span className={`method-span`}>{/*tokenString?.method*/``}</span>
            <span>--&gt;</span>
          </div>
          {` `}
          <img alt={``} className={`uk-icon-image text-img`} src={faviconSrc}/>
          {` `}
          <span>--&gt;</span>
          {` `}
          <span>You</span>
        </div>

        <CodeBlock code={response}/>
        <div>
          <Link to={`/`} className={`uk-padding-small`} uk-icon={`icon: home`}/>
          <button className={`uk-padding-small uk-link`} uk-icon={`icon: refresh`} onClick={() => {
            // todo refresh
            // clearResponse();
            // requestClosure();
          }}/>
          <FavoriteButton tokenString={token?.toEncryptedString()} uuid={uuid}/>
          <a target={`_blank`} rel={`noopener noreferrer`} href={originHref}
             className={`uk-link uk-padding-small`} uk-icon={``}>
            <img alt={``} className={`uk-icon-image`} src={faviconSrc}/>
          </a>
        </div>
      </SpinnerWrapper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TokenSend));