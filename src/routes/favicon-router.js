import express from "express";
import handler from "../util/handler";
import {decrypt} from "../util/crypto";
const Buffer = require(`buffer`).Buffer;

const request = require('request').defaults({encoding: null});

const faviconRouter = express.Router();

faviconRouter.get(`/:domain/`, handler(async (req, res) => {
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
}));

export default faviconRouter;