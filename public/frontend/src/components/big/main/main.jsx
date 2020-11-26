import React, {useState, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import {Form, Field} from "react-final-form";
import {linkValidator, headersValidator} from "#src/js/validators";
import {
  addToFavorite,
  createInput,
  removeFromFavorite,
  StorageHelper
} from "#src/js/functions";
import {encrypt} from "#src/js/crypto";
import {Link, useHistory} from "react-router-dom";
import SwitchField from "#components/small/switch-field/switch-field";
import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";
import {connect} from "react-redux";
import {favoriteSelector, uuidRequestPendingSelector, uuidsSelector} from "#src/js/redux/selectors";
import {Operations} from "#src/js/redux/operations";
import FlexM from "#components/small/flex-m/flex-m";
import FlexGroup from "#components/small/flex-group/flex-group";
import render from "less/lib/less/render";
import ChildrenDuplicator from "#components/small/children-duplicator/children-duplicator";
import waitFor from "#src/js/wait-for";
import {UuidActions} from "#src/js/redux/reducers/slices/uuid-slice";
import SpinnerWrapper from "#components/medium/spinner-wrapper/spinner-wrapper";
import OverlaySpinner from "#components/medium/spinner-wrapper/overlay-spinner";
import UIkit from "uikit";

const renderFavorite = (favorite, favoriteFromStorage) => {
  if (!favorite || Object.keys(favorite).length === 0) {
    return <div className={`uk-width-1-4@m uk-visible@s`} />;
  }

  return (
    <div className={`uk-width-1-4@m`} uk-margin={``}>
      <div className={`uk-card uk-card-body uk-card-default uk-text-left`}>
        <h3 className={`uk-card-title`}>Избранное</h3>
      </div>
      {Object.keys(favorite).map((key) => (
        <Link to={favorite[key].link} onClick={(e) => {
          if (e.target.closest(`.red-closing-sign`)) {
            e.preventDefault();
          }
        }} key={key}
              className={`uk-flex uk-flex-middle uk-card uk-card-body uk-card-default uk-card-small uk-card-hover uk-text-left card-link uk-link-reset`}
        >
          <img alt={``} className={`uk-icon-image`}
               src={StorageHelper.favicons.get(favorite[key].domain)?.data} />
          <div
            className={`uk-width-expand uk-text-left uk-flex uk-flex-center uk-padding-small uk-padding-remove-vertical`}>
            <div className={`uk-flex uk-flex-column uk-width-1-1`}>
              <span className={` favorite-label`}>{favorite[key].name}</span>
              <div>
                {
                  favorite[key].labels.map((item) => (
                    <span key={item.text}
                          className={`uk-margin-small-right uk-label ${item.className}`}>{item.text}</span>
                  ))
                }
              </div>
            </div>
          </div>
          <span className={`red-closing-sign`} uk-icon={`icon: close`} onClick={() => {
            removeFromFavorite({token: key}, () => favoriteFromStorage());
          }} />
        </Link>
      ))}
    </div>
  );
};

const Main = ({favorite, uuids, favoriteFromStorage, uuidRequestPending, getFavicon, getUuid, removeUuid}) => {
  const history = useHistory();
  const [buff, setBuff] = useState(false);
  const [tokenData, setTokenData] = useState(undefined);

  const memoizedProcessData = useCallback(({data, link, uuid}) => {
    if (data.type === `clipboard`) {
      setBuff(true);
      navigator.clipboard.writeText(location.origin + link).then(() => {
        setTimeout(() => {
          setBuff(false);
        }, 500);
      });
    } else if (data.type === `send`) {
      history.push(link);
    } else if (data.type === `send-new-window` || !data.type) {
      window.open(`${window.location.origin}${link}`, `_blank`);
    } else if (data.type === `favorite`) {
      const url = new URL(data.link);
      getFavicon(url.protocol, url.hostname);
      addToFavorite({token: tokenData.token, uuid}, favoriteFromStorage);
    }
  }, [getFavicon, favoriteFromStorage, history, tokenData]);

  const onSubmit = (data) => {
    const decrypted = {
      ...data,
      body: (data.method === `GET`) ? undefined : data.body
    };
    const token = encrypt(decrypted);

    setTokenData({token, decrypted});

    let link = `/send?token=` + token;

    if (data.shortLink) {
      getUuid(token);
      return false;
    }

    memoizedProcessData({data, link});

    return true;
  };


  useEffect(() => {
    if (tokenData?.token && uuids?.[tokenData.token]) {
      if (uuids[tokenData.token].ok) {
        memoizedProcessData({data: tokenData.decrypted, link: `/send?uuid=${uuids[tokenData.token].uuid}`, uuid: uuids[tokenData.token].uuid});
      } else {
        UIkit.notification(uuids[tokenData.token].error || ``, {pos: `bottom-right`, status: `danger`, timeout: 1500});
      }
      removeUuid(tokenData.token);
    }
  }, [tokenData, uuids, memoizedProcessData, removeUuid]);

  return (
    <>
      <div className={`uk-padding uk-padding-remove-vertical`}>

        <div className={`uk-text-center`} uk-grid={``}>
          <>
            {renderFavorite(favorite, favoriteFromStorage)}
          </>

          <Form onSubmit={onSubmit}
                mutators={{
                  toggleMethod: (args, state, utils) => {
                    utils.changeValue(state, `method`, (method) => (method === `GET`) ? `POST` : `GET`);
                  },
                  toggleRedirect: (args, state, utils) => {
                    utils.changeValue(state, `redirect`, (redirect) => !redirect);
                  },
                  toggleHandlerType: (args, state, utils) => {
                    utils.changeValue(state, `handlerType`, (handlerType) => (handlerType === `server`) ? `client` : `server`);
                  }
                }}
                render={({handleSubmit, submitting, values, form}) => (
                  <>
                    <div className={`uk-width-1-2@m`}>
                      <form onSubmit={handleSubmit} id={`send-form`}>

                        <div className={`uk-card uk-card-body uk-card-default uk-text-left`}>
                          <h3 className={`uk-card-title uk-position-relative`}>
                            <span>Новый запрос</span>
                            <Link to={`/help`}
                                  className={`uk-badge secondary-background uk-position-center-right`}>?</Link>
                          </h3>
                          <div className={`uk-flex uk-flex-center uk-flex-column uk-child-width-1-1`}
                               uk-margin={`margin: uk-margin-top`}>
                            <div className={`uk-flex`}>
                              <SwitchField name={`method`} firstCheckbox={{
                                initialValue: `GET`,
                                value: `GET`
                              }} secondCheckbox={{
                                value: `POST`
                              }} clickHandler={form.mutators.toggleMethod}
                                           visibilityTrigger={!values.method || values.method === `GET`} />

                              <div className={`uk-width-expand`}>
                                <Field name={`link`} disabled={submitting} type={`text`} icon={`forward`}
                                       placeholder={`http://example.com/login/${(!values.method || values.method === `GET`) ? `?foo=bar&bar=foo` : ``}`}
                                       validate={linkValidator} autofocus={false}>
                                  {createInput}
                                </Field>
                              </div>
                            </div>

                            {(() => {
                              if (!values.method || values.method === `GET`) {
                                return undefined;
                              }

                              return (
                                <FlexGroup>
                                  <Field name={`body`} disabled={submitting} type={`text`} icon={`link`}
                                         placeholder={`foo=bar&bar=foo`}>
                                    {createInput}
                                  </Field>
                                </FlexGroup>
                              );
                            })()}

                            <ul className={`uk-margin-remove-bottom`} uk-accordion={``}>
                              <li>
                                <a className={`uk-accordion-title uk-text-secondary`} href={`#`}>Дополнительно</a>
                                <div className={`uk-accordion-content`}>
                                  <FlexM>
                                    <div className={`uk-width-1-1`} uk-margin={``}>
                                      <SwitchField className={`uk-width-expand`} name={`handlerType`}
                                                   firstCheckbox={{
                                                     initialValue: `server`,
                                                     value: `server`,
                                                     label: `Server side`
                                                   }}
                                                   secondCheckbox={{
                                                     value: `client`,
                                                     label: `Client side`
                                                   }}
                                                   clickHandler={form.mutators.toggleHandlerType}
                                                   visibilityTrigger={!values.handlerType || values.handlerType === `server`} />


                                      <Field name={`headers`} disabled={submitting} type={`text`} icon={`cog`}
                                             placeholder={`{\n  "accept": "application/json"\n}`}
                                             validate={headersValidator} textarea={3} className={`json-textarea`}>
                                        {createInput}
                                      </Field>
                                      <div className={`uk-flex`}>
                                        <div className={`uk-width-expand`}>
                                          <Field name={`redirectTo`} disabled={submitting} type={`text`}
                                                 icon={`future`}
                                                 placeholder={`http://example.com/main/`}>
                                            {createInput}
                                          </Field>
                                        </div>
                                      </div>
                                    </div>
                                    <FlexM>
                                      <div>
                                        <label>
                                          <Field initialValue={true} name={`credentials`} component={`input`}
                                                 type={`checkbox`}
                                                 className={`uk-checkbox`} />
                                          {` `}Credentials
                                        </label>
                                      </div>
                                      {
                                        (values.handlerType && values.handlerType !== `server`) ? (
                                          <div>
                                            <label>
                                              <Field initialValue={true} name={`noCorsMode`} component={`input`}
                                                     type={`checkbox`}
                                                     className={`uk-checkbox`} />
                                              {` `}No-cors
                                            </label>
                                          </div>
                                        ) : undefined
                                      }
                                      <div>
                                        <label>
                                          <Field initialValue={true} name={`shortLink`} component={`input`}
                                                 type={`checkbox`}
                                                 className={`uk-checkbox`} />
                                          {` `}Короткая ссылка
                                        </label>
                                      </div>
                                    </FlexM>
                                  </FlexM>
                                </div>
                              </li>
                            </ul>
                          </div>

                        </div>

                      </form>
                    </div>

                    <ChildrenDuplicator
                      firstProps={{
                        "className": `uk-width-1-4@m uk-flex uk-flex-column uk-flex-around uk-visible@m`,
                        "uk-margin": ``
                      }}
                      secondProps={{
                        "className": `uk-width-1-4@m uk-flex uk-flex-between uk-hidden@m`,
                        "uk-margin": ``
                      }}
                    >
                      <div>
                        <button type={`submit`} form={`send-form`} onClick={(e) => {
                          form.change(`type`, `send`);
                          if (e.ctrlKey) {
                            form.change(`type`, `send-new-window`);
                          }
                        }} onMouseDown={(e) => {
                          if (e.button === 1) {
                            form.change(`type`, `send-new-window`);
                            handleSubmit(e);
                          }
                        }} className={`uk-button uk-button-primary`}>
                        <span className={`uk-visible@s`}>
                          Отправить
                        </span>
                          <span className={`uk-hidden@s`} uk-icon={`icon: forward`} />
                        </button>
                      </div>
                      <div>
                        <button type={`submit`} form={`send-form`} onClick={() => {
                          form.change(`type`, `favorite`);
                        }} className={`uk-button uk-position-relative`}>
                        <span className={`uk-visible@s`}>
                          В избранное
                        </span>
                          <span className={`uk-hidden@s`} uk-icon={`icon: star`} />
                        </button>
                      </div>
                      <div>
                        <button type={`submit`} form={`send-form`} disabled={!window.isSecureContext} onClick={() => {
                          form.change(`type`, `clipboard`);
                        }}
                                className={`uk-button uk-position-relative`} {...((buff) ? {style: {backgroundColor: `#8BC34A`}} : {})}>
                        <span className={((buff) ? `uk-invisible` : ``)}>
                          <span className={`uk-visible@s`}>
                          В буфер обмена
                        </span>
                        <span className={`uk-hidden@s`} uk-icon={`icon: pull`} />
                        </span>
                          <span className={`${((!buff) ? `uk-invisible` : ``)} uk-position-center`}
                                uk-icon={`icon: check`} />
                        </button>
                      </div>
                    </ChildrenDuplicator>

                  </>
                )} />
        </div>

      </div>
      <OverlaySpinner style={(uuidRequestPending) ? {} : {opacity: `0`, zIndex: `-1`}} />
    </>
  );
};

Main.propTypes = {
  favorite: PropTypes.object,
  uuids: PropTypes.object,
  uuidRequestPending: PropTypes.bool,
  favoriteFromStorage: PropTypes.func.isRequired,
  getFavicon: PropTypes.func.isRequired,
  removeUuid: PropTypes.func.isRequired,
  getUuid: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorite: favoriteSelector(state),
  uuids: uuidsSelector(state),
  uuidRequestPending: uuidRequestPendingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  favoriteFromStorage: () => dispatch(FavoriteActions.favoriteFromStorage(undefined)),
  getFavicon: (protocol, domainUrl) => dispatch(Operations.getFavicon({protocol, domainUrl})),
  getUuid: (token) => dispatch(Operations.getUuid({token})),
  removeUuid: (token) => dispatch(UuidActions.removeUuid({token}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
