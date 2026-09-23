"use strict"
import express from "express";
import * as controller from "../controllers/controller.js";

const router = express.Router();


router.get("/turns", controller.getTurns);                    // ?limit=…  (claimable or all)
router.get("/turns/:turnId", controller.getTurn);

// Atomic claim – the important one
router.post("/turns/:turnId/claim", controller.claimTurn);     // body: { processorId, profileId, allocationId?, … }
                                                               // returns: { ok, waitToken, turn, … }

// Optional explicit release / fail if you still want it
// router.post("/turns/:turnId/fail", controller.failTurn);

// --- Settlement (Runner posts here) ---
router.post("/settlement", controller.settlement);                 // body: { turnId, waitToken, status, actions?, failure? }

// --- Processor heartbeat / capacity ---
router.put("/processors/:processorId/heartbeat", controller.heartbeat);

export const routes = router;
