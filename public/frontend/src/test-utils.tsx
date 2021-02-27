import {configureStore, DeepPartial, getDefaultMiddleware, Store} from "@reduxjs/toolkit";
import rootReducer, {RootState} from "#src/js/redux/reducers/root-reducer";
import React from "react";
import {Provider} from "react-redux";
import {render as rtlRender, RenderResult} from "@testing-library/react";

export const configureAppStore = (initialState: RootState = undefined): Store => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({thunk: true}),
  preloadedState: initialState as DeepPartial<RootState>
});

const renderWithRedux = (
  ui: React.ReactElement,
  {
    initialState = undefined,
    store = configureAppStore(initialState),
  }: {
    initialState?: RootState,
    store?: Store,
  } = {}
): RenderResult => {
  const Wrapper: React.FC = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, {wrapper: Wrapper});
};

export * from "@testing-library/react";

export {renderWithRedux};