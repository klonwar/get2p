import inOperatorArrayCycle from "../util/in-operator-array-cycle";
import {linkValidator} from "#client/src/js/core/validators";
import {decrypt, encrypt} from "../util/crypto";

export enum MethodEnum {
  GET = `GET`,
  POST = `POST`,
  OPTIONS = `OPTIONS`
}

export enum HandlerTypeEnum {
  SERVER = `server`,
  CLIENT = `client`,
}

export enum CredentialsEnum {
  INCLUDE = `include`,
  SAME_ORIGIN = `same-origin`,
  OMIT = `omit`,
}

export interface TokenInterface {
  link: string;
  method: MethodEnum;
  body?: string;

  handlerType: HandlerTypeEnum;
  headers?: Record<string, unknown>;
  redirectTo?: string;

  credentials?: CredentialsEnum;
  shortLink: boolean;
  noCorsMode?: boolean;
}

export class Token implements TokenInterface {
  link: string;

  method: MethodEnum = MethodEnum.GET;
  body = ``;
  handlerType = HandlerTypeEnum.SERVER;
  headers = {} as Record<string, unknown>;
  redirectTo = ``;
  credentials = CredentialsEnum.INCLUDE;
  shortLink = true;
  noCorsMode = true;

  private encryptedString: string = undefined;

  constructor(values: TokenInterface) {
    Object.assign(this, values);
  }

  /**
   * <code>TypeGuard</code>, проверяющий переданный объект на соответствие интерфейсу токена
   * */

  static isTokenInterface(decryptedToken: ReturnType<typeof decrypt>): decryptedToken is TokenInterface {
    return inOperatorArrayCycle([`link`, `method`, `handlerType`, `shortLink`], decryptedToken);
  }

  /**
   * Проверяет зашифрованный в строку токен на совместимость по интерфейсу
   * @param s зашифрованная с помощью <code>encrypt</code> строка
   * */

  static validateEncryptedStringByInterface(s: string): boolean {
    try {
      const decryptedToken = decrypt(s);

      if (Token.isTokenInterface(decryptedToken)) {
        return true;
      }
    } catch (e) {
      return false;
    }

    return false;
  }

  /**
   * Альтернативный способ валидации строки. Проверка на совместимость по интерфейсу + проверка корректности полей токена
   * @param s зашифрованная с помощью <code>encrypt</code> строка
   * @return Строку с описанием ошибки, или <code>undefined</code>, если ее нет
   * */

  static findErrorsInEncryptedString(s: string): string | undefined {
    let decryptedToken;

    try {
      decryptedToken = decrypt(s);
    } catch (e) {
      return `Перегенерируйте токен`;
    }

    if (Token.isTokenInterface(decryptedToken)) {
      // Проверка на корректность ссылки
      const linkResponse = linkValidator(decryptedToken.link);
      if (linkResponse) {
        return linkResponse;
      }
    } else {
      if (!(`link` in decryptedToken)) {
        return `Вы не указали ссылку`;
      }

      if (!(`handlerType` in decryptedToken)) {
        return `Укажите тип обработчика (сервер/клиент)`;
      }

      if (!(`method` in decryptedToken)) {
        return `Вы не указали метод`;
      }

      if (!(`shortLink` in decryptedToken)) {
        return `Не указан принцип генерации ссылки`;
      }
    }

    return undefined;
  }

  /**
   * Создает объект Token из переданной строки, если она корректна
   * @param s зашифрованная с помощью <code>encrypt</code> строка
   * */

  static fromEncryptedString(s: string): Token {
    if (Token.validateEncryptedStringByInterface(s)) {
      const newToken = new Token(decrypt(s) as TokenInterface);
      newToken.encryptedString = s;

      return newToken;
    } else {
      throw new Error(`Invalid encrypted token string`);
    }
  }

  /**
   * Шифрует экземпляр <code>Token</code> в строку
   * */

  toEncryptedString(): string {
    if (!this.encryptedString) {
      this.encryptedString = encrypt(this);
    }
    return this.encryptedString;
  }

  equals(token: Token): boolean {
    if (!token)
      return false;

    for (const key of Object.keys(this)) {
      if ([`encryptedString`, `type`].includes(key))
        continue;
      if (JSON.stringify(this[key]) !== JSON.stringify(token[key])) {
        console.log(`wrong ${key}`);
        return false;
      }
    }

    return true;
  }


}
