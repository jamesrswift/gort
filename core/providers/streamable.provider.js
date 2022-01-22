"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subredditStream = void 0;
const stream_1 = require("stream");
const snoostream_lib_1 = __importDefault(require("../lib/snoostream.lib"));
/* istanbul ignore next */
class subredditStream extends stream_1.EventEmitter {
    constructor(redditProvider, subreddit) {
        super();
        this._redditProvider = redditProvider;
        this._streamer = new snoostream_lib_1.default(this._redditProvider.getRedditClient());
        this._subreddit = subreddit;
        this.createListeners();
    }
    createListeners() {
        var _a, _b, _c, _d;
        this._commentStream = this._streamer.commentStream(this._subreddit, {
            rate: 15000,
        });
        (_a = this._commentStream) === null || _a === void 0 ? void 0 : _a.on('post', this.onComment.bind(this));
        (_b = this._commentStream) === null || _b === void 0 ? void 0 : _b.on('error', this.onError.bind(this));
        this._submissionStream = this._streamer.submissionStream(this._subreddit, {
            rate: 15000,
        });
        (_c = this._submissionStream) === null || _c === void 0 ? void 0 : _c.on('post', this.onSubmission.bind(this));
        (_d = this._submissionStream) === null || _d === void 0 ? void 0 : _d.on('error', this.onError.bind(this));
    }
    //
    //  Event Handling
    //
    onComment(comment) {
        void comment.author.fetch().then(((user) => {
            this.emit('comment', user, comment);
        }).bind(this));
    }
    onSubmission(submission) {
        void submission.author.fetch().then(((user) => {
            this.emit('submission', user, submission);
        }).bind(this));
    }
    //
    //  Error Handling
    //
    onError(error) {
        this.emit('error', error);
    }
}
exports.subredditStream = subredditStream;
