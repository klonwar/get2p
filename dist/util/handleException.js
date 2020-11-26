"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.routeHandler = void 0;

const routeHandler = yourAsyncHandler => {
  return async (req, res, next) => {
    try {
      await yourAsyncHandler(req, res);
    } catch (e) {
      console.error(e);
      res.status(500).send(undefined);
    }

    next();
  };
};

exports.routeHandler = routeHandler;
var _default = routeHandler;
exports.default = _default;