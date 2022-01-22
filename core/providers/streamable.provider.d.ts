/// <reference types="node" />
import Snoowrap from 'snoowrap';
import { EventEmitter } from 'stream';
import { RedditProvider } from './reddit.provider';
export declare class pooledSubredditStream extends EventEmitter {
    private static _instance?;
    static get Instance(): pooledSubredditStream;
    private constructor();
    private _redditProvider;
    private _streamer;
    private _commentStream?;
    private _submissionStream?;
    private _subredditList;
    private streamOptions;
    addSubreddit(subreddit: string): void;
    addSubreddits(subreddits: string[]): void;
    private get subreddits();
    invalidatePolls(): void;
    private onComment;
    private onSubmission;
    private onError;
}
export declare interface subredditStream {
    on(event: 'comment', listener: (user: Snoowrap.RedditUser, comment: Snoowrap.Comment) => void): this;
    on(event: 'submission', listener: (user: Snoowrap.RedditUser, submission: Snoowrap.Submission) => void): this;
    on(event: 'error', listener: (...data: any[]) => void): this;
}
export declare class subredditStream extends EventEmitter {
    private _subreddit;
    private _subreddits;
    constructor(redditProvider: RedditProvider, subreddit: string);
    private onComment;
    private onSubmission;
    private onError;
}
