import express from "express";
import uuidRouter from "./uuid-router";
import faviconRouter from "./favicon-router";
import requestRouter from "./request-router";

const router = express.Router();

router.use(`/uuid`, uuidRouter)

router.use(`/favicon`, faviconRouter);

router.use(`/request`, requestRouter);

export default router;
