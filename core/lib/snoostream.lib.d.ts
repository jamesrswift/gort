import Snoowrap from 'snoowrap';
import Pollify from './pollify.lib';
declare type tPollFn = (...args: any[]) => Promise<any>;
interface IPostStreamOptions {
    rate?: number;
    regex?: RegExp;
}
export default class SnooStream {
    snoowrap: Snoowrap;
    startTime: number;
    drift: number;
    constructor(options: Snoowrap | Snoowrap.SnoowrapOptions, drift?: number);
    postStream(pollFn: tPollFn, subreddit?: string, opts?: IPostStreamOptions): Pollify;
    private dedupe;
    commentStream(subreddit?: string, opts?: IPostStreamOptions): Pollify;
    submissionStream(subreddit?: string, opts?: IPostStreamOptions): Pollify;
    modqueueStream(subreddit: string, opts?: IPostStreamOptions): Pollify;
}
export {};
