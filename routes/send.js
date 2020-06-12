const express = require('express');
const request = require('request').defaults({encoding: null});
const CryptoJS = require(`crypto-js`);
const getFavicon = require(`favicon`);
const Buffer = require(`buffer`).Buffer;
const fetch = require(`node-fetch`);
const cookieParser = require(`set-cookie-parser`);

const key = `G8sKJhv0w7`;
const decrypt = (data) => {
  const b64 = CryptoJS.enc.Hex.parse(data);
  const aes = b64.toString(CryptoJS.enc.Base64);
  const decrypted = CryptoJS.AES.decrypt(aes, key);
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

const router = express.Router();
router.get(`/favicon/:domain/`, async (req, res, next) => {
  try {
    //https://stackoverflow.com/
    //53616c7465645f5fb1fddbdf360b5dd5fe3e4f957bc4dca3f8069915b9523448f441a3c20ae266911e25f9355b12fbdb

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

    const response = await fetch(link, {
      credentials,
      method,
      body: (method !== `GET`) ? body : undefined,
      headers: {
        ...autoHeaders,
        ...headers
      }
    });

    const text = (await response.text());
    const rawCookies = cookieParser.parse(response.headers.raw()[`set-cookie`]);

    for (let item of rawCookies) {
      const {name, value, ...rest} = item;
      res.cookie(name, value, {...rest, domain: `.` + url.hostname, secure: true});
    }

    try {
      JSON.parse(text);
      res.send(JSON.stringify({type: `json`, data: text}));
    } catch (e) {
      res.send(JSON.stringify({type: `text`, data: text}));
    }
  } catch (e) {
    res.status(500).send(undefined);
  }
});

module.exports = router;
