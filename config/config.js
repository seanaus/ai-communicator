import os from "os";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT) || 5000;
const appName = process.env.NAME || "AI Communicator";
const collections = process.env.COLLECTION?.split(", ").map((s) => s.trim()) || [];
const url = `http://${host}:${port}`;
const logging = Boolean(process.env.LOGGING === "true");
const debug = Boolean(process.env.DEBUG_MODE === "true");

export {
    appName,
    port,
    url,
    logging,
    debug,
    collections
};