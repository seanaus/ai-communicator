"use strict";
import * as dataService from "./dataService.js";
export const requestWork = (limit) => dataService.getJobs(limit)
