/// <reference types="node" />
import EventEmitter from 'events';
export declare class LogManager extends EventEmitter {
    private _sOptions;
    private _bConsoleLoggerRegistered;
    configure(options: LogOptions): LogManager;
    getLogger(moduleName: string): Logger;
    onLogEntry(listener: (logEntry: LogEntry) => void): LogManager;
    registerConsoleLogger(): LogManager;
}
export interface LogEntry {
    level: string;
    module: string;
    location?: string;
    message: string;
}
export interface LogOptions {
    minLevels: {
        [module: string]: string;
    };
}
export declare const logging: LogManager;
export declare class Logger {
    private _logManager;
    private _minLevel;
    private _module;
    private readonly levels;
    constructor(logManager: EventEmitter, module: string, minLevel: string);
    private levelToInt;
    log(logLevel: string, message: string): void;
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
