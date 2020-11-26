import CryptoJS from "crypto-js";

const key = `G8sKJhv0w7`;
export const encrypt = (data) => {
  const aes = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  const b64 = CryptoJS.enc.Base64.parse(aes);
  return b64.toString(CryptoJS.enc.Hex);
};
export const decrypt = (data) => {
  const b64 = CryptoJS.enc.Hex.parse(data);
  const aes = b64.toString(CryptoJS.enc.Base64);
  const decrypted = CryptoJS.AES.decrypt(aes, key);
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};
