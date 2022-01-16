"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
/* istanbul ignore next */
const PollTypes = {
    promise: function (self, startTime, ...args) {
        const req = self
            .pollFn(...args)
            .then((data) => {
            self.emit('data', data, startTime);
        })
            .catch((e) => self.emit('error', e));
        req.then(() => self.repoll(startTime));
    },
    callback: function (self, startTime, ...args) {
        void self.pollFn(...args, (e, ...data) => {
            if (e)
                return self.emit('error', e);
            self.emit('data', ...data, startTime);
            self.repoll(startTime);
        });
    },
    return: function (self, startTime, ...args) {
        try {
            const data = self.pollFn(...args);
            self.emit('data', data, startTime);
        }
        catch (e) {
            self.emit('error', e);
        }
        self.repoll(startTime);
    },
};
/* istanbul ignore next */
class Pollify extends events_1.default {
    constructor(options, pollFn, ...args) {
        super();
        this.stopped = false;
        this.firstRun = true;
        this.pollFn = pollFn;
        this.options = options;
        this.fnArgs = args;
        this.poll();
    }
    poll() {
        if (this.stopped)
            return;
        const startTime = Date.now();
        PollTypes[this.options.mode](this, startTime, ...this.fnArgs);
        this.firstRun = false;
    }
    repoll(startTime) {
        const timeDiff = this.options.rate - (Date.now() - startTime);
        if (timeDiff > 0) {
            setTimeout(this.poll.bind(this), timeDiff);
            return;
        }
        setImmediate(this.poll.bind(this));
        return;
    }
    start() {
        if (this.stopped) {
            this.stopped = false;
            this.poll();
        }
    }
    stop() {
        this.stopped = true;
    }
}
exports.default = Pollify;
