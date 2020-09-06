const express = require('express');
const request = require('request').defaults({encoding: null});
const CryptoJS = require(`crypto-js`);
const getFavicon = require(`favicon`);
const Buffer = require(`buffer`).Buffer;
const fetch = require(`node-fetch`);
const cookieParser = require(`set-cookie-parser`);

const mysql = require(`mysql`);
const uuid = require(`uuid`);
const uuidv4 = uuid.v4;

const dbConfig = (process.env.NODE_ENV === `production`)
  ? {
    host: process.env.CLEARDB_DATABASE_URL,
    user: `b71c1229540546`,
    password: `2509393d`,
    database: `heroku_697aa784bcd3e5d`
  } : {
    host: `localhost`,
    user: `root`,
    password: `root`,
    database: `get2p`
  };
let db;

const stableConnection = () => {
  db = mysql.createConnection(dbConfig)
  db.connect((err) => {
    if (err) {
      setTimeout(stableConnection, 2000);
    }
  });
  db.on(`error`, (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      stableConnection();
    } else {
      throw err;
    }
  });
};
stableConnection();

const key = `G8sKJhv0w7`;
const decrypt = (data) => {
  const b64 = CryptoJS.enc.Hex.parse(data);
  const aes = b64.toString(CryptoJS.enc.Base64);
  const decrypted = CryptoJS.AES.decrypt(aes, key);
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

const dbQuery = async (db, query) => {
  return await new Promise((res, rej) => {
    db.query(query, (error, results, fields) => {
      if (error) rej(error);
      res(results);
    });
  });
};

const router = express.Router();

router.get(`/`, (req, res, next) => {
  res.render('index', {title: 'g2p api'});
});

router.get(`/uuid/c/:token/`, async (req, res, next) => {
  const token = req.params.token;
  const fields = await dbQuery(db, `SELECT uuid FROM tokens WHERE token="${token}"`);
  const isTokenAlreadyExists = fields.length !== 0;

  if (isTokenAlreadyExists) {
    res.send(JSON.stringify({uuid: fields[0].uuid, token}));
    return;
  }

  let newUuid = uuidv4();
  while (true) {
    const resp = await dbQuery(db, `SELECT * FROM tokens WHERE uuid="${newUuid}"`);
    if (resp && resp.length !== 0)
      newUuid = uuidv4();
    else
      break;
  }

  const response = await dbQuery(db, `INSERT INTO tokens (uuid, token) VALUES ("${newUuid}", "${token}")`);

  res.send(JSON.stringify({uuid: newUuid, token}))

});

router.get(`/uuid/g/:uuid/`, async (req, res, next) => {
  const uuid = req.params.uuid;
  const fields = await dbQuery(db, `SELECT * FROM tokens WHERE uuid="${uuid}"`);

  if (fields.length !== 0) {
    res.send(JSON.stringify({uuid, token: fields[0].token}));
    return;
  }

  res.send(JSON.stringify({}));
});

router.get(`/favicon/:domain/`, async (req, res, next) => {
  try {
    const domain = decrypt(req.params.domain);

    const faviconURL = `https://www.google.com/s2/favicons?domain=${domain}`;

    const data = await new Promise((resolve) => {
      request.get(faviconURL, (err, resp, body) => {
        if (!err && resp.statusCode === 200) {
          resolve(`data:${resp.headers[`content-type`]};base64,${Buffer.from(body).toString(`base64`)}`);
        }
      });
    });

    res.send(JSON.stringify({data}));
  } catch (e) {
    res.status(400).send(JSON.stringify(undefined));
  }
});

router.get(`/request/:token/`, async (req, res, next) => {
  try {
    const {link, credentials = `include`, method = `GET`, body, headers} = decrypt(req.params.token);

    let jsonHeaders;
    try {
      jsonHeaders = JSON.parse(headers);
    } catch (e) {
      jsonHeaders = {};
    }
    const url = new URL(link);
    const autoHeaders = {};
    if (body && (method !== `GET`)) {
      try {
        JSON.parse(body);
        autoHeaders[`content-type`] = `application/json`;
      } catch (e) {
        autoHeaders[`content-type`] = `application/x-www-form-urlencoded`;
      }
    }
    const finalHeaders = {
      ...autoHeaders,
      ...jsonHeaders
    };

    const response = await fetch(link, {
      credentials,
      method,
      body: (method !== `GET`) ? body : undefined,
      headers: finalHeaders
    });


    const text = (await response.text());

    const rawCookies = response.headers.raw()[`set-cookie`];

    try {
      JSON.parse(text);
      res.send(JSON.stringify({type: `json`, data: text, cookies: rawCookies}));
    } catch (e) {
      res.send(JSON.stringify({type: `text`, data: text, cookies: rawCookies}));
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(undefined);
  }
});

module.exports = router;
