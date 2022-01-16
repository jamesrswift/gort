"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snoowrap_1 = __importDefault(require("snoowrap"));
const pollify_lib_1 = __importDefault(require("./pollify.lib"));
/* istanbul ignore next */
function isSnoowrap(obj) {
    return (typeof obj.getNew == 'function' &&
        typeof obj.getNewComments == 'function');
}
/* istanbul ignore next */
class SnooStream {
    constructor(options, drift = 0) {
        this.snoowrap = isSnoowrap(options)
            ? options
            : new snoowrap_1.default(options);
        this.startTime = Math.floor(Date.now() / 1000);
        this.drift = drift;
    }
    postStream(pollFn, subreddit = 'all', opts = {}) {
        const cacheObj = { cache: [] };
        const poll = new pollify_lib_1.default({
            rate: opts.rate || 1000,
            mode: 'promise',
        }, pollFn, subreddit, opts);
        poll.on('data', (data) => {
            data = this.dedupe(data, cacheObj);
            data.filter((post) => post.created_utc >= this.startTime - this.drift)
                //.forEach( (post: Snoowrap.Comment | Snoowrap.Submission) => this.parse(post, poll, opts.regex))
                .forEach((post) => poll.emit('post', post));
        });
        return poll;
    }
    dedupe(batch, cacheObj) {
        const diff = batch.filter((entry) => cacheObj.cache.every((oldEntry) => entry.id !== oldEntry.id));
        cacheObj.cache = batch;
        return diff;
    }
    /*private parse(data : Snoowrap.Comment | Snoowrap.Submission, emitter: Pollify, regex: RegExp){
        const match = data.body.match(regex);
        if ( match ){
            emitter.emit('post', data, match)
        }
    }*/
    commentStream(subreddit, opts) {
        const pollFn = this.snoowrap.getNewComments.bind(this.snoowrap);
        return this.postStream(pollFn, subreddit, opts);
    }
    submissionStream(subreddit, opts) {
        const pollFn = this.snoowrap.getNew.bind(this.snoowrap);
        return this.postStream(pollFn, subreddit, opts);
    }
    modqueueStream(subreddit, opts) {
        const sub = this.snoowrap.getSubreddit(subreddit);
        const pollFn = sub.getModqueue.bind(sub);
        return this.postStream(pollFn);
    }
}
exports.default = SnooStream;
