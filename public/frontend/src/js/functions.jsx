import InputHint from "#components/small/input-hint/input-hint";
import React from "react";
import {encrypt, decrypt} from "#src/js/core/crypto";

const createStorageItem = (storageKey) => ({
  set: (data) => localStorage[storageKey] = encrypt(data),
  list: () => (localStorage[storageKey]) ? decrypt(localStorage[storageKey]) : undefined,
  get: (index) => StorageHelper[storageKey].list()?.[index],
  put: (index, payload) => StorageHelper[storageKey].set({...StorageHelper[storageKey].list(), [index]: {...payload}}),
  del: (index) => {
    const prev = {...StorageHelper[storageKey].list()};
    delete prev[index];
    StorageHelper[storageKey].set(prev);
  },
  clear: () => {
    delete localStorage[storageKey];
  }
});

export const StorageHelper = {
  favorite: createStorageItem(`favorite`),
  history: createStorageItem(`history`),
  favicons: createStorageItem(`favicons`),
};

export const highlightJSON = (jsonString) => {
  jsonString = jsonString.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
  return jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = `json-number`;
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = `json-key`;
      } else {
        cls = `json-string`;
      }
    } else if (/true|false/.test(match)) {
      cls = `json-boolean`;
    } else if (/null/.test(match)) {
      cls = `json-null`;
    }
    return `<span class="${cls}">${match}</span>`;
  });
};

export const addToFavorite = ({token, uuid}, next) => {
  const {handlerType, method, redirectTo, link} = decrypt(token);
  const {hostname, pathname, search} = new URL(link);

  const labels = [];
  labels.push({text: handlerType});
  labels.push({text: method});
  if (redirectTo) {
    labels.push({text: `redirect`});
  }
  StorageHelper.favorite.put(uuid || token, {
    link: `/send/${uuid || token}`,
    name: hostname + pathname + search,
    domain: hostname,
    labels
  });
  next();
};
export const removeFromFavorite = ({token, uuid}, next) => {
  StorageHelper.favorite.del(uuid || token);
  next();
};

export const createInput = (data) => {
  const {autofocus = false, input, icon, disabled = false, placeholder = ``, textarea = false, className = ``} = data;
  const instError = data.meta.error && data.meta.modified;
  const submError = (data.meta.submitError || data.meta.submitFailed) && !data.meta.active;

  const errorText = data.meta.error || ``;
  const error = (instError || submError) && errorText;

  const chooseTextarea = () => (textarea)
    ? (
      <>
        <textarea rows={textarea} {...input} autoFocus={autofocus} disabled={disabled} placeholder={placeholder}
                  className={`uk-input${(error) ? ` uk-form-danger` : ``}${(className) ? ` ${className}` : ``}`} />
        {(error) ? (
          <InputHint className={`uk-position-center-right`} text={errorText} />
        ) : undefined}
      </>
    ) : (
      <>
        <input {...input} autoFocus={autofocus} disabled={disabled} placeholder={placeholder}
               className={`uk-input${(error) ? ` uk-form-danger` : ``}${(className) ? ` ${className}` : ``}`} />
        {(error) ? (
          <InputHint className={`uk-position-center-right`} text={errorText} />
        ) : undefined}
      </>
    );
  return (
    <div>
      <div className={`uk-inline uk-width-1-1 `}>
        <span className={`uk-form-icon`} uk-icon={`icon: ${icon}`} />
        {chooseTextarea()}
      </div>
    </div>
  );
};
