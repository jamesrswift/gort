// Code credit to Adrian Hall, https://adrianhall.github.io/cloud/2019/06/30/building-an-efficient-logger-in-typescript/

import { EventEmitter } from "stream";

/* istanbul ignore next */
export class LogManager extends EventEmitter {

    private _sOptions: LogOptions = {
        minLevels: {
            ':': 'info'
        }
    };

    private _bConsoleLoggerRegistered: boolean = false;

    public configure(options: LogOptions): LogManager {
        this._sOptions = Object.assign({}, this._sOptions, options);
        return this;
    }

    public getLogger(moduleName: string): Logger {
        let minLevel: string = 'none';
        let match: string = '';

        for (const key in this._sOptions.minLevels) {
            if (moduleName.startsWith(key) && key.length >= match.length) {
                minLevel = this._sOptions.minLevels[key]
                match = key;
            }
        }

        return new Logger(this, moduleName, minLevel);
    }

    public onLogEntry(listener: (logEntry: LogEntry) => void): LogManager {
        this.on('log', listener);
        return this;
    }

    public registerConsoleLogger(): LogManager {
        if (this._bConsoleLoggerRegistered) return this;

        this.onLogEntry((logEntry) => {
            const msg = `${logEntry.location} [${logEntry.module}] ${logEntry.message}`;
            switch (logEntry.level) {
                case 'trace':
                    console.trace(msg);
                    break;
                case 'debug':
                    console.debug(msg);
                    break;
                case 'info':
                    console.info(msg);
                    break;
                case 'warn':
                    console.warn(msg);
                    break;
                case 'error':
                    console.error(msg);
                    break;
                default:
                    console.log(`{${logEntry.level}} ${msg}`);
            }
        });

        this._bConsoleLoggerRegistered = true;
        return this;
    }

}

export interface LogEntry {
    level: string;
    module: string;
    location?: string;
    message: string;
}

export interface LogOptions {
    minLevels: { [module: string]: string }
}

export const logging = new LogManager();

/* istanbul ignore next */
export class Logger {
    private _logManager: EventEmitter;
    private _minLevel: number;
    private _module: string;
    private readonly levels: { [key: string]: number } = {
        'trace': 1,
        'debug': 2,
        'info': 3,
        'warn': 4,
        'error': 5
    };

    constructor(logManager: EventEmitter, module: string, minLevel: string) {
        this._logManager = logManager;
        this._minLevel = this.levelToInt(minLevel);
        this._module = module;
    }

    private levelToInt(minLevel: string): number {
        if (minLevel.toLocaleLowerCase() in this.levels) {
            return this.levels[minLevel.toLocaleLowerCase()];
        }
        return 99;
    }

    public log(logLevel: string, message: string): void {
        const level = this.levelToInt(logLevel);
        if (level < this._minLevel) return;

        const logEntry: LogEntry = {
            level: logLevel,
            module: this._module,
            message: message
        }

        const error = new Error("");
        if (error.stack) {
            const cla = error.stack.split("\n");
            let idx = 1;
            while (idx < cla.length && cla[idx].includes("at Logger.Object.")) idx++;
            if (idx < cla.length) {
                logEntry.location = cla[idx].slice(cla[idx].indexOf("at ") + 3, cla[idx].length);
            }
        }

        this._logManager.emit('log', logEntry);
    }

    public trace(message: string): void { this.log('trace', message); }
    public debug(message: string): void { this.log('debug', message); }
    public info(message: string): void { this.log('info', message); }
    public warn(message: string): void { this.log('warn', message); }
    public error(message: string): void { this.log('error', message); }
}
