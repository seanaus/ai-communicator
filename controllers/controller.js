"use strict";

import * as dataService from "../services/dataService.js";
// import * as loggerService from "../services/loggerService.js";
import * as turnStatusEnum from "../enums/turnStatusEnum.js";

const getTurns = async (req, res) => {
    try {
        // 1. Parse query string to a base-10 integer, fallback to a default (e.g., 8)
        const limit = parseInt(req.query.limit, 10) || 8;
        const data = (await dataService.getTurns()).slice(0, limit);
        // 3. Return the payload safely
        return res.json(data);
    } catch (error) {
        console.error("Failed to request turns:", error);
        return res.status(500).json({ ok: false, error: "Internal Server Error" });
    }
};

const getTurn = async (req, res) => {
    try {
        const id = req.params.turnId;
        const data = await dataService.getTurn(id);
        return res.json(data);
    } catch (error) {
        console.error("Failed to request turn:", error);
        return res.status(500).json({ ok: false, error: "Internal Server Error" });
    }
};


const heartbeat = (req, res) => {
    const processorId = req.params.processorId ?? "";
    console.log(`Heartbeat from: ${processorId}`);
    res.json({ status: "ok" });
}

const claimTurn = async (req, res) => {
    const id = req.params.turnId;

    const obj = {
        nextToken: "",
        waitToken: `dummy.waitToken.${id}`,
        expiresAt: dataService.dateAdd(1).toISOString(),
        status: turnStatusEnum.WAITING,
        processorId: req?.body?.processorId ?? "",
        profileId: req?.body?.processorId ?? "",
        allocationId: req?.body?.processorId ?? ""
    }

    await dataService.editTurn(id, obj);

    const turn = await dataService.getTurn(id);

    return res.status(200).json({
        ok: true,
        turn
    });
};

const settlement = async (req, res) => {

    const turnId = req.body.turnId;
    const waitToken = req.body.waitToken ?? "";
    const status = req.body.status;
    const result = req.body.result;
    const actions = req.body.actions;

    const turn = await dataService.getTurn(turnId);

    if (turn.waitToken !== waitToken) {
        return res.status(400).json({
            ok: false,
            error: "Invalid waitToken"
        });
    }

    const obj = {
        waitToken,
        status,
        result,
        actions
    }

    await dataService.editTurn(turnId, obj);

    const response = await dataService.getTurn(turnId);

    console.log(`Settling turn with turnId: ${turnId} success: ${result.success}`);

    return res.status(200).json({
        ok: true
    });
}

export {
    getTurn,
    getTurns,
    claimTurn,
    settlement,
    heartbeat
}