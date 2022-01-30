"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subredditStream = exports.pooledSubredditStream = void 0;
const stream_1 = require("stream");
const snoostream_lib_1 = __importDefault(require("../lib/snoostream.lib"));
const reddit_provider_1 = require("./reddit.provider");
class pooledSubredditStream extends stream_1.EventEmitter {
    constructor() {
        super();
        this._redditProvider = reddit_provider_1.RedditProvider.Instance;
        this._subredditList = [];
        this.streamOptions = {
            rate: 15000
        };
        this._streamer = new snoostream_lib_1.default(this._redditProvider.getRedditClient());
    }
    static get Instance() {
        return this._instance || (this._instance = new pooledSubredditStream());
    }
    addSubreddit(subreddit) {
        if (!this._subredditList.includes(subreddit)) {
            this._subredditList.push(subreddit);
        }
    }
    addSubreddits(subreddits) {
        subreddits.forEach(this.addSubreddit.bind(this));
    }
    get subreddits() { return this._subredditList.join("+"); }
    ;
    invalidatePolls() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // Unlisten
        (_a = this._commentStream) === null || _a === void 0 ? void 0 : _a.stop();
        (_b = this._commentStream) === null || _b === void 0 ? void 0 : _b.removeAllListeners();
        (_c = this._submissionStream) === null || _c === void 0 ? void 0 : _c.stop();
        (_d = this._submissionStream) === null || _d === void 0 ? void 0 : _d.removeAllListeners();
        this._commentStream = this._streamer.commentStream(this.subreddits, this.streamOptions);
        (_e = this._commentStream) === null || _e === void 0 ? void 0 : _e.on('post', this.onComment.bind(this));
        (_f = this._commentStream) === null || _f === void 0 ? void 0 : _f.on('error', this.onError.bind(this));
        this._submissionStream = this._streamer.submissionStream(this.subreddits, this.streamOptions);
        (_g = this._submissionStream) === null || _g === void 0 ? void 0 : _g.on('post', this.onSubmission.bind(this));
        (_h = this._submissionStream) === null || _h === void 0 ? void 0 : _h.on('error', this.onError.bind(this));
    }
    //
    //  Event Handling
    //
    onComment(comment) {
        this.emit('comment', comment.subreddit.display_name.toLowerCase(), comment.author, comment);
    }
    onSubmission(submission) {
        this.emit('submission', submission.subreddit.display_name.toLowerCase(), submission.author, submission);
    }
    //
    //  Error Handling
    //
    onError(error) {
        this.emit('error', error);
    }
}
exports.pooledSubredditStream = pooledSubredditStream;
/* istanbul ignore next */
class subredditStream extends stream_1.EventEmitter {
    constructor(redditProvider, subreddit) {
        super();
        this._subreddit = subreddit;
        this._subreddits = subreddit.split("+").map(value => value.toLowerCase());
        pooledSubredditStream.Instance.addSubreddits(this._subreddits);
        pooledSubredditStream.Instance.invalidatePolls();
        pooledSubredditStream.Instance.on('comment', this.onComment.bind(this));
        pooledSubredditStream.Instance.on('submission', this.onSubmission.bind(this));
        pooledSubredditStream.Instance.on('error', this.onError.bind(this));
    }
    //
    //  Event Handling
    //
    onComment(subreddit, user, comment) {
        if (this._subreddits.includes(subreddit)) {
            this.emit('comment', user, comment);
        }
    }
    onSubmission(subreddit, user, submission) {
        if (this._subreddits.includes(subreddit)) {
            this.emit('submission', user, submission);
        }
    }
    //
    //  Error Handling
    //
    onError(error) {
        this.emit('error', error);
    }
}
exports.subredditStream = subredditStream;
