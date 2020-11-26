"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressHistoryApiFallback = _interopRequireDefault(require("express-history-api-fallback"));

var _apiRouter = _interopRequireDefault(require("./routes/api-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)(); // HTTPS only

app.use((req, res, next) => {
  if (!req.secure && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }

  next();
});
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());

const root = _path.default.join(__dirname, 'public/frontend/dist');

app.use(_express.default.static(root));
app.use((0, _cors.default)(), (req, res, next) => {
  const hostname = req.get('host').split(`:`)[0];

  switch (hostname) {
    case `localhost`:
      res.header("Access-Control-Allow-Origin", `http://${hostname}:1337`);
      break;

    case `get2p.herokuapp.com`:
      if (req.get(`protocol`) === `http`) {
        res.header("Access-Control-Allow-Origin", `http://${hostname}`);
      } else {
        res.header("Access-Control-Allow-Origin", `https://${hostname}`);
      }

      break;

    default:
      res.header("Access-Control-Allow-Origin", null);
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api/v1', _apiRouter.default);
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
  next();
});
app.use((0, _expressHistoryApiFallback.default)(`index.html`, {
  root
}));
module.exports = app;