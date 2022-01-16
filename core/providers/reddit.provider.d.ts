/// <reference types="node" />
import EventEmitter from 'events';
import Snoowrap from 'snoowrap';
import { subredditStream } from './streamable.provider';
export declare class RedditProvider extends EventEmitter {
    private constructor();
    private static _instance?;
    static get Instance(): RedditProvider;
    private _client;
    getRedditClient(): Snoowrap;
    getTargetSubreddit(): Snoowrap.Subreddit;
    createListeners(subreddit?: string): subredditStream;
    editWikiPage(args: editWikiPageInterface): Promise<void>;
}
export interface editWikiPageInterface {
    subreddit: Snoowrap.Subreddit;
    page: Snoowrap.WikiPage;
    page_title: string;
    text: string;
    reason?: string;
}
