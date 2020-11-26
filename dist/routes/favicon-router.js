"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _handler = _interopRequireDefault(require("../util/handler"));

var _crypto = require("../util/crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Buffer = require(`buffer`).Buffer;

const request = require('request').defaults({
  encoding: null
});

const faviconRouter = _express.default.Router();

faviconRouter.get(`/:domain/`, (0, _handler.default)(async (req, res) => {
  const domain = (0, _crypto.decrypt)(req.params.domain);
  const faviconURL = `https://www.google.com/s2/favicons?domain=${domain}`;
  const data = await new Promise(resolve => {
    request.get(faviconURL, (err, resp, body) => {
      if (!err && resp.statusCode === 200) {
        resolve(`data:${resp.headers[`content-type`]};base64,${Buffer.from(body).toString(`base64`)}`);
      }
    });
  });
  res.send(JSON.stringify({
    data
  }));
}));
var _default = faviconRouter;
exports.default = _default;