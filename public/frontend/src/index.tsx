import React from "react";
import * as ReactDOM from "react-dom";
import App from "#components/app/app";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {BrowserRouter} from "react-router-dom";
import "#src/css/style.less";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "#src/js/redux/reducers/root-reducer";
import {Provider} from "react-redux";
import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";
import 'react-perfect-scrollbar/dist/css/styles.css';
import {FaviconsActions} from "#src/js/redux/reducers/slices/favicons-slice";
import {StorageHelper} from "#src/js/core/storage-helper";
import {SettingsActions} from "#src/js/redux/reducers/slices/settings-slice";

(() => {
  // @ts-ignore
  UIkit.use(Icons);

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({thunk: true}),
    devTools: true,
  });

  // Получим из хранилища в state сохранённые данные
  store.dispatch(FavoriteActions.favoriteFromStorage());
  store.dispatch(FaviconsActions.faviconsFromStorage());
  store.dispatch(SettingsActions.settingsFromStorage());

  // Сохраним в localStorage изменения нужных нам данных
  store.subscribe(() => {
    const state = store.getState();
    StorageHelper.favorite.set(state.favoriteReducer);
    StorageHelper.favicons.set(state.faviconsReducer);
    StorageHelper.settings.set(state.settingsReducer);
  });

  ReactDOM.render((
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    ),
    document.querySelector(`#root`),
  );

})();