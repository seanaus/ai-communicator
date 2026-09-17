"use strict";
import * as data from "../data.js";

const getTurns = async () => await data.getTurns();
const getTurn = async (id) => await data.getTurn(id);
const editTurn = async (id, obj) => await data.editTurn(id, obj);
const dateAdd = (dayOffset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date; // Returns the updated Date object
}

export {
    getTurns,    
    getTurn,
    editTurn,
    dateAdd
};
