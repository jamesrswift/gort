
import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';
import SnooStream from '../lib/snoostream.lib'
import { OrFail } from '../lib/helper.lib'
import Pollify from '../lib/pollify.lib'
import EventEmitter from 'events'
import { subredditStream } from './streamable.provider';

export class RedditProvider extends EventEmitter {

    //
    // Singleton Pattern
    //
    private constructor() {
        super()
        dotenv.config();

        this._client = new Snoowrap({
            userAgent: OrFail(process.env.REDDIT_USERAGENT),
            clientId: OrFail(process.env.REDDIT_CLIENTID),
            clientSecret: OrFail(process.env.REDDIT_CLIENTSECRET),
            username: OrFail(process.env.REDDIT_USERNAME),
            password: OrFail(process.env.REDDIT_PASSWORD)
        });
    }

    private static _instance?: RedditProvider;
    public static get Instance(): RedditProvider { return this._instance || (this._instance = new RedditProvider()) }

    //
    //  Reddit and subreddits
    //

    private _client: Snoowrap
    public getRedditClient(): Snoowrap { return this._client; }
    
    /* istanbul ignore next */
    public getTargetSubreddit() {
        return this._client.getSubreddit(OrFail(process.env.REDDIT_SUBREDDIT))
    }

    //
    // Manage Polling
    //

    /* istanbul ignore next */
    public createListeners(subreddit: string = OrFail(process.env.REDDIT_SUBREDDIT)): subredditStream {
        return new subredditStream(this, subreddit)
    }

}