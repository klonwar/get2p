const composeValidators = (...validators) => (value) => validators.reduce((e, validator) => e || validator(value), false);
const required = (value: string): string => (value ? undefined : `Это поле обязательно`);
const needJSON = (value: string): string => {
  if (value) {
    try {
      JSON.parse(value);
    } catch (e) {
      return `Необходим JSON`;
    }
  }
  return undefined;
};
const isLink = (value: string): string => {
  if (!(value + ``).startsWith(`https://`) && !(value + ``).startsWith(`http://`)) {
    return `Укажите протокол`;
  }

  try {
    new URL(value);
  } catch (e) {
    return `Ссылка указана неверно`;
  }

  return undefined;
};


export const linkValidator = composeValidators(required, isLink);
export const headersValidator = composeValidators(needJSON);
