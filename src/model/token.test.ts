import {HandlerTypeEnum, MethodEnum, Token} from "#src/model/token";

describe(`Token`, () => {
  let exampleToken: Token;
  let exampleTokenEncrypted: string;

  beforeAll(() => {
    exampleToken = new Token({
      link: `https://google.com/`,
      method: MethodEnum.GET,
      handlerType: HandlerTypeEnum.SERVER,
      shortLink: false
    });
    exampleTokenEncrypted = exampleToken.toEncryptedString();
  });

  test(`TokenInterface recognizes correctly`, () => {
    expect(Token.isTokenInterface({
      ...exampleToken
    })).toBe(true);

    expect(Token.isTokenInterface({
      lol: `kek`,
    })).toBe(false);
  });

  test(`Token string validates correctly`, () => {
    expect(Token.validateEncryptedStringByInterface(exampleTokenEncrypted)).toBe(true);
    expect(Token.validateEncryptedStringByInterface(`lol`)).toBe(false);
  });

  test(`Encrypts correctly`, () => {
    console.log(exampleToken.toEncryptedString());
    const firstEnc = exampleToken.toEncryptedString();

    expect(firstEnc).toMatch(/[0-9a-f]{224}/);
    expect(firstEnc).toBe(exampleToken.toEncryptedString());
    expect(firstEnc).toBe(exampleToken.toEncryptedString());
  });

  test(`Decrypts correctly`, () => {
    const newToken = Token.fromEncryptedString(exampleTokenEncrypted);
    expect(newToken).toEqual(exampleToken);
    expect(newToken.toEncryptedString()).toBe(exampleTokenEncrypted);
  });

});