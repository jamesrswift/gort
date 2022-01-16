/// <reference types="node" />
import Snoowrap from 'snoowrap';
import { EventEmitter } from 'stream';
import { RedditProvider } from './reddit.provider';
export declare interface subredditStream {
    on(event: 'comment', listener: (user: Snoowrap.RedditUser, comment: Snoowrap.Comment) => void): this;
    on(event: 'submission', listener: (user: Snoowrap.RedditUser, submission: Snoowrap.Submission) => void): this;
    on(event: 'error', listener: (...data: any[]) => void): this;
}
export declare class subredditStream extends EventEmitter {
    private _redditProvider;
    private _streamer;
    private _commentStream?;
    private _submissionStream?;
    private _subreddit;
    constructor(redditProvider: RedditProvider, subreddit: string);
    private createListeners;
    private onComment;
    private onSubmission;
    private onError;
}
