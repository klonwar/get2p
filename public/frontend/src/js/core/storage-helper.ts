import {decrypt, encrypt} from "#server/src/util/crypto";
import {FavoriteState} from "#src/js/redux/reducers/slices/favorite-slice";
import {FaviconsState} from "#src/js/redux/reducers/slices/favicons-slice";
import {SettingsState} from "#src/js/redux/reducers/slices/settings-slice";

interface StorageItem<T> {
  set: (data: T) => void;
  list: () => T | undefined;
}

const createStorageItem = <T>(storageKey: string): StorageItem<T> => ({
  set: (data) => (localStorage[storageKey] = encrypt(data)),
  list: () =>
    localStorage[storageKey] ? decrypt(localStorage[storageKey]) as T : undefined,
});

export const StorageHelper = {
  favorite: createStorageItem<FavoriteState>(`favorite`),
  favicons: createStorageItem<FaviconsState>(`favicons`),
  settings: createStorageItem<SettingsState>(`settings`),
};



