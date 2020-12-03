import React, {useState, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import {
  addToFavorite,
  createInput,
  removeFromFavorite,
  StorageHelper
} from "#src/js/functions";
import {Link, useHistory} from "react-router-dom";
import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";
import {connect} from "react-redux";
import {favoriteSelector, uuidRequestPendingSelector, uuidsSelector} from "#src/js/redux/selectors";
import {Operations} from "#src/js/redux/operations";
import {UuidActions} from "#src/js/redux/reducers/slices/uuid-slice";
import OverlaySpinner from "#components/medium/spinner-wrapper/overlay-spinner";
import UIkit from "uikit";
import SendForm from "#components/medium/send-form/send-form";
import {isUndefined} from "uikit/src/js/util";
import tokenFromFormData from "#src/js/core/functions/token-from-form-data";

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

const Main = (props) => {
  const {
    favorite,
    generatedUuids,
    favoriteFromStorage,
    uuidRequestPending,
    getFavicon,
    getUuid,
    removeUuid
  } = props;
  const history = useHistory();
  const [isBuffWritting, setBuffWritting] = useState(false);
  const [token, setToken] = useState(undefined);
  const [formData, setFormData] = useState(undefined);

  const memoizedFormDataHandler = useCallback(({uuid, token: providedToken}) => {
    const link = `/send/${uuid || providedToken || ``}`;
    switch (formData.type) {
      case `clipboard`:
        setBuffWritting(true);
        navigator.clipboard.writeText(location.origin + link).then(() => {
          setTimeout(() => {
            setBuffWritting(false);
          }, 500);
        });
        break;
      case `send`:
        history.push(link);
        break;
      case `send-new-window`:
        window.open(`${window.location.origin}${link}`, `_blank`);
        break;
      case `favorite`:
        const url = new URL(formData.link);
        getFavicon(url.protocol, url.hostname);
        addToFavorite({providedToken, uuid}, favoriteFromStorage);
        break;
    }
  }, [formData, setBuffWritting, history, getFavicon, favoriteFromStorage]);

  useEffect(() => {
    // Uuid не нужен, обработаем токен
    if (!isUndefined(formData) && !formData.shortLink && token) {
      memoizedFormDataHandler({token});
    }
  }, [memoizedFormDataHandler, token, formData]);

  useEffect(() => {
    // Получили uuid и теперь его надо обработать
    const uuid = generatedUuids?.[token]?.uuid;
    if (formData?.shortLink && uuid) {
      memoizedFormDataHandler({token, uuid});
    }
  }, [memoizedFormDataHandler, generatedUuids, token, formData]);

  useEffect(() => {
    // Пришел ответ об ошибке во время генерации UUID-a
    if (token && generatedUuids?.[token]) {
      if (!generatedUuids[token].ok) {
        // Сообщим об ошибке
        UIkit.notification(generatedUuids[token].error || ``, {
          pos: `bottom-right`,
          status: `danger`,
          timeout: 1500
        });
      }
    }
  }, [token, generatedUuids, removeUuid]);

  return (
    <>
      <div className={`uk-padding uk-padding-remove-vertical`}>

        <div className={`uk-text-center`} uk-grid={``}>
          <>
            {renderFavorite(favorite, favoriteFromStorage)}
          </>

          <SendForm
            onSubmit={(data) => {
              const encoded = tokenFromFormData(data);
              setToken(encoded);
              setFormData(data);

              if (data.shortLink) {
                getUuid(encoded);
              }
            }}

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
  generatedUuids: PropTypes.object,
  uuidRequestPending: PropTypes.bool,
  favoriteFromStorage: PropTypes.func.isRequired,
  getFavicon: PropTypes.func.isRequired,
  removeUuid: PropTypes.func.isRequired,
  getUuid: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorite: favoriteSelector(state),
  generatedUuids: uuidsSelector(state),
  uuidRequestPending: uuidRequestPendingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  favoriteFromStorage: () => dispatch(FavoriteActions.favoriteFromStorage(undefined)),
  getFavicon: (protocol, domainUrl) => dispatch(Operations.getFavicon({protocol, domainUrl})),
  getUuid: (token) => dispatch(Operations.getUuid({token})),
  removeUuid: (token) => dispatch(UuidActions.removeUuid({token}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
