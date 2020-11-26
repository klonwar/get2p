"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.handler = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handler = yourAsyncHandler => {
  return async (req, res, next) => {
    try {
      await yourAsyncHandler(req, res);
    } catch (e) {
      console.error(_chalk.default.red(e.stack));
      res.status(500).send(undefined);
    }

    next();
  };
};

exports.handler = handler;
var _default = handler;
exports.default = _default;