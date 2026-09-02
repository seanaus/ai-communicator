"use strict"
import express from "express";
import * as controller from "../controllers/controller.js";

const router = express.Router();

router.get(`/tasks`, controller.getTasks);
router.post("/tasks/:dispatchId/hold", controller.holdTask);
router.post("/tasks/:dispatchId/claim", controller.claimTask);
router.post("/tasks/:dispatchId/complete", controller.completeTask);
router.post("/tasks/:dispatchId/revoke", controller.revokeTask);
router.put("/areas/:areaId/heartbeat", controller.heartbeat);

export const routes = router;
