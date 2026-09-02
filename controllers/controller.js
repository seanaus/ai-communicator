"use strict";

import * as controllerService from "../services/controllerService.js";
import * as loggerService from "../services/loggerService.js";

const heldTasks = new Map();

const getTasks = async (req, res) => {
    try {
        // 1. Parse query string to a base-10 integer, fallback to a default (e.g., 8)
        const limit = parseInt(req.query.limit, 10) || 8;

        // 2. Await the service which now resolves after your mock DB delay
        const data = await controllerService.requestWork(limit);

        // 3. Return the payload safely
        return res.json(data);
    } catch (error) {
        console.error("Failed to request work:", error);
        return res.status(500).json({ ok: false, error: "Internal Server Error" });
    }
};


const heartbeat = (req, res) => {

    console.log(`WORKERS: ${JSON.stringify(req.body)}`);

    res.json({
        status: "ok"
    });
}

const holdTask = async (req, res) => {
    const { dispatchId } = req.params;

    // Simulate a task that is already held
    if (heldTasks.has(dispatchId)) {
        return res.status(409).json({
            ok: false,
            error: "Task is already held"
        });
    }

    const claimId = `dev-claim-${dispatchId}`;

    //heldTasks.set(dispatchId, claimId);

    return res.status(200).json({
        ok: true,
        claimId,
        task: {
            dispatchId,
            status: "held",
            claimId
        }
    });
};


const claimTask = async (req, res) => {
    const { dispatchId } = req.params;
    const { claimId } = req.body;

    // const storedClaimId = heldTasks.get(dispatchId);

    // No matching hold
    // if (!storedClaimId) {
        // return res.status(409).json({
        //     ok: false,
        //     error: "Task is not held"
        // });
    // }

    // Wrong/stale claim ID
    // if (storedClaimId !== claimId) {
    //     return res.status(409).json({
    //         ok: false,
    //         error: "Invalid claimId"
    //     });
    // }

    return res.status(200).json({
        ok: true,
        task: {
            dispatchId,
            status: "claimed",
            claimId
        }
    });
};

export {
    holdTask,
    claimTask,
    getTasks,
    heartbeat
}