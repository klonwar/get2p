import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import fallback from 'express-history-api-fallback';
import apiRouter from "./routes/api-router";
import appRoot from "app-root-path";

const app = express();

// HTTPS only
app.use((req, res, next) => {
  if (!req.secure && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use(cors(), (req, res, next) => {
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
      res.header("Access-Control-Allow-Origin", null)
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/api/v1', apiRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'production' ? err : {};

  res.status(err.status || 500);
  res.render('error');
  next();
});


const root = path.join(appRoot + ``, 'public/frontend/dist');
app.use(express.static(root));
app.use(fallback(`index.html`, {root}));

module.exports = app;