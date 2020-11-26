"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _handler = _interopRequireDefault(require("../util/handler"));

var _crypto = require("../util/crypto");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _htmlEscape = _interopRequireDefault(require("../util/html-escape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestRouter = _express.default.Router();

requestRouter.get(`/:token/`, (0, _handler.default)(async (req, res) => {
  const {
    link,
    credentials = `include`,
    method = `GET`,
    body,
    headers
  } = (0, _crypto.decrypt)(req.params.token);
  let jsonHeaders;

  try {
    jsonHeaders = JSON.parse(headers);
  } catch (e) {
    jsonHeaders = {};
  }

  const autoHeaders = {};

  if (body && method !== `GET`) {
    try {
      JSON.parse(body);
      autoHeaders[`content-type`] = `application/json`;
    } catch (e) {
      autoHeaders[`content-type`] = `application/x-www-form-urlencoded`;
    }
  }

  const finalHeaders = { ...autoHeaders,
    ...jsonHeaders
  };
  const response = await (0, _nodeFetch.default)(link, {
    credentials,
    method,
    body: method !== `GET` ? body : undefined,
    headers: finalHeaders
  });
  const text = await response.text();
  const rawCookies = response.headers.raw()[`set-cookie`];

  try {
    JSON.parse(text);
    res.send(JSON.stringify({
      type: `json`,
      data: (0, _htmlEscape.default)(text),
      cookies: rawCookies
    }));
  } catch (e) {
    res.send(JSON.stringify({
      type: `text`,
      data: (0, _htmlEscape.default)(text),
      cookies: rawCookies
    }));
  }
}));
var _default = requestRouter;
exports.default = _default;