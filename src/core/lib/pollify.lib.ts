import EventEmitter from 'events'

export interface IPollifyOptions {
    rate: number,
    mode: 'promise' | 'callback' | 'return'
}

export interface IPollifyDelegate {
    (...args: any[]): Promise<void>
}

/* istanbul ignore next */
const PollTypes: { [key: string]: (self: Pollify, startTime: number, ...args: any[]) => void } = {

    "promise": function (self: Pollify, startTime: number, ...args: any[]): void {
        const req = self.pollFn(...args).then(data => {
            self.emit('data', data, startTime)
        }).catch(e => self.emit("error", e))
        req.then(() => self.repoll(startTime))
    },

    "callback": function (self: Pollify, startTime: number, ...args: any[]): void {
        void self.pollFn(...args, (e: any, ...data: any[]) => {
            if (e) return self.emit('error', e);
            self.emit('data', ...data, startTime)
            self.repoll(startTime);
        })
    },

    "return": function (self: Pollify, startTime: number, ...args: any[]): void {
        try {
            const data = self.pollFn(...args);
            self.emit('data', data, startTime);
        } catch (e: any) {
            self.emit('error', e)
        }
        self.repoll(startTime);
    }

}

interface IPollify {
    emit(event: 'error', error: any): void;
    emit(event: 'data', ...any: any[]): void;
}

/* istanbul ignore next */
export default class Pollify extends EventEmitter implements IPollify {

    stopped = false;
    firstRun = true;

    pollFn: IPollifyDelegate;
    options: IPollifyOptions;
    fnArgs: any[];

    constructor(options: IPollifyOptions, pollFn: IPollifyDelegate, ...args: any[]) {
        super()
        this.pollFn = pollFn;
        this.options = options;
        this.fnArgs = args;

        this.poll();
    }

    poll(): void {
        if (this.stopped) return;
        const startTime = Date.now();
        PollTypes[this.options.mode](this, startTime, ...this.fnArgs);
        this.firstRun = false;
    }

    repoll(startTime: number): void {
        const timeDiff = this.options.rate - (Date.now() - startTime);

        if (timeDiff > 0) {
            setTimeout(this.poll.bind(this), timeDiff);
            return;
        }

        setImmediate(this.poll.bind(this));
        return;
    }

    start(): void {
        if (this.stopped) {
            this.stopped = false;
            this.poll();
        }
    }

    stop(): void {
        this.stopped = true;
    }

}