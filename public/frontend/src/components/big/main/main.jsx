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
import SendForm from "#components/medium/send-form/send-form";
import SendInputs from "#components/medium/send-form/send-inputs";
import SendButtons from "#components/medium/send-form/send-buttons";

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
  const [isBuffWritting, setBuffWritting] = useState(false);
  const [tokenData, setTokenData] = useState(undefined);

  const handleFormResponse = useCallback(({data, link, uuid}) => {
    if (data.type === `clipboard`) {
      setBuffWritting(true);
      navigator.clipboard.writeText(location.origin + link).then(() => {
        setTimeout(() => {
          setBuffWritting(false);
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

    // Хотим короткую ссылку - генерируем
    if (data.shortLink) {
      getUuid(token);
      return false;
    }

    handleFormResponse({data, link: `/send/` + token});

    return true;
  };


  useEffect(() => {
    // UUID сгенерировался
    if (tokenData?.token && uuids?.[tokenData.token]) {
      if (uuids[tokenData.token].ok) {
        handleFormResponse({
          data: tokenData.decrypted,
          link: `/send/${uuids[tokenData.token].uuid}`,
          uuid: uuids[tokenData.token].uuid
        });
      } else {
        UIkit.notification(uuids[tokenData.token].error || ``, {pos: `bottom-right`, status: `danger`, timeout: 1500});
      }
      removeUuid(tokenData.token);
    }
  }, [tokenData, uuids, handleFormResponse, removeUuid]);

  return (
    <>
      <div className={`uk-padding uk-padding-remove-vertical`}>

        <div className={`uk-text-center`} uk-grid={``}>
          <>
            {renderFavorite(favorite, favoriteFromStorage)}
          </>

          <SendForm
            onSubmit={onSubmit}
            isBuffWritting={isBuffWritting}
          />

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
