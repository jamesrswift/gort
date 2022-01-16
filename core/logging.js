"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.logging = exports.LogManager = void 0;
// Code credit to Adrian Hall, https://adrianhall.github.io/cloud/2019/06/30/building-an-efficient-logger-in-typescript/
const chalk_1 = __importDefault(require("chalk"));
const events_1 = __importDefault(require("events"));
/* istanbul ignore next */
class LogManager extends events_1.default {
    constructor() {
        super(...arguments);
        this._sOptions = {
            minLevels: {
                ':': 'info',
            },
        };
        this._bConsoleLoggerRegistered = false;
    }
    configure(options) {
        this._sOptions = Object.assign({}, this._sOptions, options);
        return this;
    }
    getLogger(moduleName) {
        let minLevel = 'none';
        let match = '';
        for (const key in this._sOptions.minLevels) {
            if (moduleName.startsWith(key) && key.length >= match.length) {
                minLevel = this._sOptions.minLevels[key];
                match = key;
            }
        }
        return new Logger(this, moduleName, minLevel);
    }
    onLogEntry(listener) {
        this.on('log', listener);
        return this;
    }
    registerConsoleLogger() {
        if (this._bConsoleLoggerRegistered)
            return this;
        this.onLogEntry((logEntry) => {
            switch (logEntry.level) {
                case 'info':
                case 'trace':
                case 'debug':
                    console.log(`{${chalk_1.default.greenBright(logEntry.level)}} [${chalk_1.default.blueBright(logEntry.module)}] ${logEntry.message}`);
                    break;
                case 'warn':
                    console.log(`{${chalk_1.default.yellowBright(logEntry.level)}} [${chalk_1.default.blueBright(logEntry.module)}] ${logEntry.message}`);
                    break;
                case 'error':
                default:
                    console.log(`{${chalk_1.default.redBright(logEntry.level)}} [${chalk_1.default.blueBright(logEntry.module)}] ${logEntry.message}`);
                    break;
            }
        });
        this._bConsoleLoggerRegistered = true;
        return this;
    }
}
exports.LogManager = LogManager;
exports.logging = new LogManager();
/* istanbul ignore next */
class Logger {
    constructor(logManager, module, minLevel) {
        this.levels = {
            trace: 1,
            debug: 2,
            info: 3,
            warn: 4,
            error: 5,
        };
        this._logManager = logManager;
        this._minLevel = this.levelToInt(minLevel);
        this._module = module;
    }
    levelToInt(minLevel) {
        if (minLevel.toLocaleLowerCase() in this.levels) {
            return this.levels[minLevel.toLocaleLowerCase()];
        }
        return 99;
    }
    log(logLevel, message) {
        const level = this.levelToInt(logLevel);
        if (level < this._minLevel)
            return;
        const logEntry = {
            level: logLevel,
            module: this._module,
            message: message,
        };
        const error = new Error('');
        if (error.stack) {
            const cla = error.stack.split('\n');
            let idx = 1;
            while (idx < cla.length && cla[idx].includes('at Logger.Object.'))
                idx++;
            if (idx < cla.length) {
                logEntry.location = cla[idx].slice(cla[idx].indexOf('at ') + 3, cla[idx].length);
            }
        }
        this._logManager.emit('log', logEntry);
    }
    trace(message) {
        this.log('trace', message);
    }
    debug(message) {
        this.log('debug', message);
    }
    info(message) {
        this.log('info', message);
    }
    warn(message) {
        this.log('warn', message);
    }
    error(message) {
        this.log('error', message);
    }
}
exports.Logger = Logger;
