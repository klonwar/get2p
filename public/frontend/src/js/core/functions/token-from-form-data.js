import {encrypt} from "#src/js/core/crypto";

const tokenFromFormData = (data) => {
  return encrypt(data);
};

export default tokenFromFormData;
