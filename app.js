const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fallback = require('express-history-api-fallback');

const sendRouter = require('./routes/send');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const root = path.join(__dirname, 'public/dist');
app.use(express.static(root));

app.use(cors(), (req, res, next) => {
  const hostname = req.get('host').split(`:`)[0];
  switch (hostname) {
    case `localhost`:
      res.header("Access-Control-Allow-Origin", `http://${hostname}:1337`);
      break;
    case `get2p.herokuapp.com`:
      res.header("Access-Control-Allow-Origin", `http://${hostname}`);
      break;
    default:
      res.header("Access-Control-Allow-Origin", null)
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/api/v1', sendRouter);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(fallback(`index.html`, {root}));

module.exports = app;
