"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gort_1 = __importDefault(require("./bot/gort"));
const logging_1 = require("./core/logging");
logging_1.logging
    .configure({
    minLevels: {
        '': 'trace',
    },
})
    .registerConsoleLogger();
const bot = new gort_1.default();
