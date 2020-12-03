import {decrypt} from "#src/js/core/crypto";

const composeValidators = (...validators) => (value) => validators.reduce((e, validator) => e || validator(value), false);
const required = (value) => (value ? undefined : `Это поле обязательно`);
const needJSON = (value) => {
  if (value) {
    try {
      JSON.parse(value);
    } catch (e) {
      return `Необходим JSON`;
    }
  }
  return undefined;
};
const isLink = (value) => {
  if (!(value + ``).startsWith(`https://`) && !(value + ``).startsWith(`http://`)) {
    return `Укажите протокол`;
  }

  return undefined;
};


export const linkValidator = composeValidators(required, isLink);
export const headersValidator = composeValidators(needJSON);
