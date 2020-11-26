import express from "express";
import handler from "../util/handler";
import {decrypt} from "../util/crypto";
import fetch from "node-fetch";
import escape from "../util/html-escape";

const requestRouter = express.Router();

requestRouter.get(`/:token/`, handler(async (req, res) => {
  const {link, credentials = `include`, method = `GET`, body, headers} = decrypt(req.params.token);
  let jsonHeaders;
  try {
    jsonHeaders = JSON.parse(headers);
  } catch (e) {
    jsonHeaders = {};
  }

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
}));

export default requestRouter;