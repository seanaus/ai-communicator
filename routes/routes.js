"use strict"
import express from "express";
import * as controller from "../controllers/controller.js";

const router = express.Router();

router.post("/tasks/:dispatchId/hold", controller.holdTask);
router.post("/tasks/:dispatchId/claim", controller.claimTask);
router.put("/areas/:areaId/heartbeat", controller.heartbeat);
router.get(`/tasks`, controller.requestWork);

export const routes = router;
