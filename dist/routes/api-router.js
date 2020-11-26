"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _uuidRouter = _interopRequireDefault(require("./uuid-router"));

var _faviconRouter = _interopRequireDefault(require("./favicon-router"));

var _requestRouter = _interopRequireDefault(require("./request-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.use(`/uuid`, _uuidRouter.default);
router.use(`/favicon`, _faviconRouter.default);
router.use(`/request`, _requestRouter.default);
var _default = router;
exports.default = _default;