import React from "react";
import * as ReactDOM from "react-dom";
import App from "#components/big/app/app";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {BrowserRouter} from "react-router-dom";
import "#src/css/style.less";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "#src/js/redux/reducers/root-reducer";
import {Provider} from "react-redux";
import {FavoriteActions} from "#src/js/redux/reducers/slices/favorite-slice";
import {Scrollbar} from "react-scrollbars-custom";

(() => {
  UIkit.use(Icons);

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({thunk: true}),
    devTools: true,
  });

  store.dispatch(FavoriteActions.favoriteFromStorage(undefined));

  ReactDOM.render((
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    ),
    document.querySelector(`#root`),
  );

})();
