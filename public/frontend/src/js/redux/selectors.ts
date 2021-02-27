import {RootState} from "#src/js/redux/reducers/root-reducer";
import {TokensStateList, UuidsStateList,} from "#src/js/redux/reducers/slices/uuid-slice";
import {FavoriteStateItem} from "#src/js/redux/reducers/slices/favorite-slice";
import {FaviconsStateItem} from "#src/js/redux/reducers/slices/favicons-slice";
import {SettingsList} from "#src/js/redux/reducers/slices/settings-slice";
import {createSelector} from "reselect";
import {SendRequestOperationResult} from "#src/js/redux/operations/slices/send-request-operation";

export const responseSelector = (state: RootState): SendRequestOperationResult =>
  state?.sendReducer?.siteResponse;

export const responseCodeSelector = createSelector<RootState, SendRequestOperationResult, number>(
  responseSelector,
  (item) => item?.code
);
export const responseMessageSelector = createSelector<RootState, SendRequestOperationResult, string>(
  responseSelector,
  (item) => item?.message
);
export const responseCookiesSelector = createSelector<RootState, SendRequestOperationResult, Array<string>>(
  responseSelector,
  (item) => item?.cookies
);

export const favoriteSelector = (state: RootState): Record<string, FavoriteStateItem> =>
  state?.favoriteReducer?.favorite;

export const faviconsSelector = (state: RootState): Record<string, FaviconsStateItem> =>
  state?.faviconsReducer?.favicons;

export const uuidsSelector = (state: RootState): UuidsStateList =>
  state?.uuidReducer?.uuids;
export const uuidRequestPendingSelector = (state: RootState): boolean =>
  state?.uuidReducer?.pending;
export const tokensFromUuidsSelector = (state: RootState): TokensStateList =>
  state?.uuidReducer?.tokens;

export const instantTokenStringSelector = (state: RootState): string =>
  state?.instantReducer?.tokenString;

export const settingsSelector = (state: RootState): SettingsList =>
  state?.settingsReducer?.settings;

export const accordionAlwaysOpenedSettingSelector = createSelector<RootState, SettingsList, boolean>(
  settingsSelector,
  (item) => item?.accordionAlwaysOpened
);
export const darkThemeSettingSelector = createSelector<RootState, SettingsList, boolean>(
  settingsSelector,
  (item) => item?.darkTheme
);