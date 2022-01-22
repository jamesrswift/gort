"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const gort_1 = __importDefault(require("./bot/gort"));
const logging_1 = require("./core/logging");
dotenv_1.default.config();
console.log('Starting GORT, loading logger');
logging_1.logging
    .configure({
    minLevels: {
        '': 'info',
    },
})
    .registerConsoleLogger();
const bot = new gort_1.default();
