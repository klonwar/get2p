"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = exports.encrypt = void 0;

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const key = `G8sKJhv0w7`;

const encrypt = data => {
  const aes = _cryptoJs.default.AES.encrypt(JSON.stringify(data), key).toString();

  const b64 = _cryptoJs.default.enc.Base64.parse(aes);

  return b64.toString(_cryptoJs.default.enc.Hex);
};

exports.encrypt = encrypt;

const decrypt = data => {
  const b64 = _cryptoJs.default.enc.Hex.parse(data);

  const aes = b64.toString(_cryptoJs.default.enc.Base64);

  const decrypted = _cryptoJs.default.AES.decrypt(aes, key);

  return JSON.parse(decrypted.toString(_cryptoJs.default.enc.Utf8));
};

exports.decrypt = decrypt;