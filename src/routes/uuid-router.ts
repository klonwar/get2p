import express from "express";
import handler from "../util/handler";
import * as uuidRoot from "uuid";
import knex from "knex";

const uuidv4 = uuidRoot.v4;
const prod = process.env.NODE_ENV === `production`;
const uuidRouter = express.Router();

let dbConfig;
if (prod) {
  const url = process.env.CLEARDB_DATABASE_URL;
  const res = url.match(/mysql:\/\/([a-zA-Z0-9]+):([a-zA-Z0-9]+)@([a-zA-Z0-9_\-.]+)\/([a-zA-Z0-9_\-.]+)/);
  dbConfig = {
    host: res[3],
    user: res[1],
    password: res[2],
    database: res[4]
  };
} else {
  dbConfig = {
    host: `127.0.0.1`,
    user: `root`,
    password: `root`,
    database: `get2p`
  };
}


const db = knex({
  client: `mysql2`,
  connection: dbConfig,
  pool: {min: 0, max: 10}
});

uuidRouter.get(`/c/:token/`, handler(async (req, res) => {
  const token = req.params.token;
  const fields = await db.select(`uuid`).from(`tokens`).where({token});
  const isTokenAlreadyExists = fields.length !== 0;

  if (isTokenAlreadyExists) {
    res.send(JSON.stringify({uuid: fields[0].uuid, token}));
    return;
  }

  const newUuid = uuidv4();

  await db(`tokens`).insert({uuid: newUuid, token});

  res.send(JSON.stringify({uuid: newUuid, token}));
}));

uuidRouter.get(`/g/:uuid/`, handler(async (req, res) => {
  const uuid = req.params.uuid;
  const fields = await db.select(`*`).from(`tokens`).where({uuid});

  if (fields.length !== 0) {
    res.send(JSON.stringify({uuid, token: fields[0].token}));
    return;
  }

  res.send(JSON.stringify({}));
}));


export default uuidRouter;

export interface UuidRouterResponse {
  uuid?: string,
  token?: string,
}