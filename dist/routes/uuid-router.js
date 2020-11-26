"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _handler = _interopRequireDefault(require("../util/handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uuidv4 = require(`uuid`).v4;

const prod = process.env.NODE_ENV === `production`;

const uuidRouter = _express.default.Router();

const dbConfig = prod ? {
  host: process.env.CLEARDB_DATABASE_URL,
  user: `b71c1229540546`,
  password: `2509393d`,
  database: `heroku_697aa784bcd3e5d`
} : {
  host: `127.0.0.1`,
  user: `root`,
  password: `root`,
  database: `get2p`
};

const db = require(`knex`)({
  client: `mysql2`,
  connection: dbConfig,
  pool: {
    min: 0,
    max: 10
  }
});

uuidRouter.get(`/c/:token/`, (0, _handler.default)(async (req, res) => {
  const token = req.params.token;
  const fields = await db.select(`uuid`).from(`tokens`).where({
    token
  });
  const isTokenAlreadyExists = fields.length !== 0;

  if (isTokenAlreadyExists) {
    res.send(JSON.stringify({
      uuid: fields[0].uuid,
      token
    }));
    return;
  }

  let newUuid = uuidv4();
  await db(`tokens`).insert({
    uuid: newUuid,
    token
  });
  res.send(JSON.stringify({
    uuid: newUuid,
    token
  }));
}));
uuidRouter.get(`/g/:uuid/`, (0, _handler.default)(async (req, res) => {
  const uuid = req.params.uuid;
  const fields = await db.select("*").from("tokens").where({
    uuid
  });

  if (fields.length !== 0) {
    res.send(JSON.stringify({
      uuid,
      token: fields[0].token
    }));
    return;
  }

  res.send(JSON.stringify({}));
}));
var _default = uuidRouter;
exports.default = _default;