/// <reference types="node" />
import EventEmitter from 'events';
export interface IPollifyOptions {
    rate: number;
    mode: 'promise' | 'callback' | 'return';
}
export interface IPollifyDelegate {
    (...args: any[]): Promise<void>;
}
interface IPollify {
    emit(event: 'error', error: any): void;
    emit(event: 'data', ...any: any[]): void;
}
export default class Pollify extends EventEmitter implements IPollify {
    stopped: boolean;
    firstRun: boolean;
    pollFn: IPollifyDelegate;
    options: IPollifyOptions;
    fnArgs: any[];
    constructor(options: IPollifyOptions, pollFn: IPollifyDelegate, ...args: any[]);
    poll(): void;
    repoll(startTime: number): void;
    start(): void;
    stop(): void;
}
export {};
