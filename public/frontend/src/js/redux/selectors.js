export const responseCodeSelector = (state) => state?.sendReducer?.siteResponse?.code;
export const responseMessageSelector = (state) => state?.sendReducer?.siteResponse?.message;

export const faviconsSelector = (state) => state?.sendReducer?.favicons;
export const favoriteSelector = (state) => state?.favoriteReducer?.favorite;

export const uuidsSelector = (state) => state?.uuidReducer?.uuids;
export const uuidRequestPendingSelector = (state) => state?.uuidReducer?.pending;
export const tokensFromUuidsSelector = (state) => state?.uuidReducer?.tokens;

export const instantTokenSelector = (state) => state?.instantReducer?.token;
