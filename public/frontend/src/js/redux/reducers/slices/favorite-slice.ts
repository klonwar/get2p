import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StorageHelper} from "#src/js/core/storage-helper";
import {Token} from "#server/src/model/token";

const stateItemFromTokenAndUuid = ({tokenString, uuid}: { tokenString: string, uuid?: string }): FavoriteStateItem => {
  const {handlerType, method, redirectTo, link} = Token.fromEncryptedString(tokenString);
  const {hostname, pathname, search} = new URL(
    typeof link === `string` ? link : ``
  );

  const labels = [];
  labels.push({text: handlerType});
  labels.push({text: method});
  if (redirectTo) {
    labels.push({text: `redirect`});
  }

  return {
    link: `/send/${uuid || tokenString}`,
    name: hostname + pathname + search,
    domain: hostname,
    labels,
  };
};

export interface FavoriteStateItem {
  link: string;
  name: string;
  domain: string;
  labels: Array<{
    text: string,
    className?: string
  }>;
}

export interface FavoriteState {
  favorite: Record<string, FavoriteStateItem>;
}

export interface TokenUuidPair {
  tokenString: string,
  uuid?: string
}

const favoriteSlice = createSlice({
  name: `favorite`,
  initialState: {
    favorite: {}
  } as FavoriteState,
  reducers: {
    favoriteFromStorage: (state: FavoriteState) => {
      try {
        if (StorageHelper.favorite.list()?.favorite) {
          state.favorite = StorageHelper.favorite.list().favorite;
        }
      } catch (e) {
        state.favorite = {};
      }
    },
    addToFavorite: (state: FavoriteState, action: PayloadAction<TokenUuidPair>) => {
      state.favorite[action.payload.uuid || action.payload.tokenString] = stateItemFromTokenAndUuid(action.payload);
    },
    removeFromFavorite: (state: FavoriteState, action: PayloadAction<TokenUuidPair>) => {
      delete state.favorite[action.payload.tokenString];
      delete state.favorite[action.payload.uuid];
    }
  },
});

export const FavoriteActions = {
  ...favoriteSlice.actions,
};
export default favoriteSlice.reducer;
