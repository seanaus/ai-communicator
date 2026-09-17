"use strict"
import express from "express";
import * as controller from "../controllers/controller.js";

const router = express.Router();

//router.get(`/tasks`, controller.getTasks);
//router.post("/tasks/:turnId/hold", controller.holdTask);
//router.post("/tasks/:turnId/claim", controller.claimTask);
//router.post("/tasks/:turnId/complete", controller.completeTask);
//router.post("/tasks/:turnId/revoke", controller.revokeTask);
//router.put("/areas/:areaId/heartbeat", controller.heartbeat);


router.get("/turns", controller.getTurns);                    // ?limit=…  (claimable or all)
router.get("/turns/:turnId", controller.getTurn);

// Atomic claim – the important one
router.post("/turns/:turnId/claim", controller.claimTurn);     // body: { processorId, profileId, allocationId?, … }
                                                               // returns: { ok, waitToken, turn, … }

// Optional explicit release / fail if you still want it
// router.post("/turns/:turnId/fail", controller.failTurn);

// --- Settlement (Runner posts here) ---
router.post("/settlement", controller.settle);                 // body: { turnId, waitToken, status, actions?, failure? }

// --- Processor heartbeat / capacity ---
router.put("/processors/:processorId/heartbeat", controller.heartbeat);

export const routes = router;
