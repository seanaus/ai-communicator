"use strict";
import fs from 'fs';
import * as config from "../config/config.js";

const logFile = "log.csv";

const logError = (err) => {
    if (config.logging) {
        const line = [
            `ERROR,${csvText(err.code)},${getDateTime('GB')} \n`,
            `ERROR,${csvText(err.message)},${getDateTime('GB')} \n`
        ]
        line.forEach((item) => {
            if (!config.debug) {
                logToFile(logFile, item);
            } else {
                console.log(item);
            }
        })
    }
}
const log = (message) => {
    const line = `INFO,${csvText(message)},${getDateTime('GB')} \n`;
    if (config.logging) {
        if (!config.debug) {
            logToFile(logFile, line);
        } else {
            console.log(line)
        }
    }

}
const logToFile = (file, data) => {
    return fs.appendFile(file, data, err => {
        if (err) {
            console.log(err)
            return false
        } else {
            return true
        }
    })
}
const getDateTime = (timeZone = "UTC") => {
    return new Date().toLocaleString('en-GB', { timeZone: timeZone })
}
const csvText = (text) => {
    if (text !== undefined && text !== null) {
        text = text.replace(",", "");
        text = text.replace(/\s+/g, ' ').trim();
        return text
    } else {
        return ""
    }
}
export {
    logError,
    log,
    logToFile
}