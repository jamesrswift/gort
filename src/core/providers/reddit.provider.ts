
import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';
import SnooStream from '../lib/snoostream.lib'
import { OrFail,  } from '../lib/helper.lib'
import Pollify from '../lib/pollify.lib'
import EventEmitter from 'events'

export declare interface RedditProvider{
    on(event: 'comment', listener: (user: Snoowrap.RedditUser, comment: Snoowrap.Comment) => void ): this
    on(event: 'submission', listener: (user: Snoowrap.RedditUser, submission: Snoowrap.Submission) => void ): this
    on(event: 'error', listener: (...data: any[]) => void): this
}

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

        this._streamer = new SnooStream(this._client);
        this.createListeners();
    }

    private static _instance?: RedditProvider;
    public static get Instance(): RedditProvider { return this._instance || (this._instance = new RedditProvider()) }

    private _client: Snoowrap
    public getRedditClient() : Snoowrap { return this._client; }

    //
    // Manage Polling
    //
    private _streamer: SnooStream;
    private _commentStream?: Pollify;
    private _submissionStream?: Pollify;

    private createListeners(): void {
        this._commentStream = this._streamer.commentStream( OrFail(process.env.REDDIT_SUBREDDIT), {rate: 10000});
        this._commentStream?.on('post', this.onComment.bind(this))
        this._commentStream?.on('error', this.onError.bind(this))

        this._submissionStream = this._streamer.submissionStream( OrFail(process.env.REDDIT_SUBREDDIT), {rate: 10000});
        this._submissionStream?.on('post', this.onSubmission.bind(this))
        this._submissionStream?.on('error', this.onError.bind(this))
    }

    //
    //  Event Handling
    //

    private onComment(comment: Snoowrap.Comment): void {
        void comment.author.fetch().then( ((user: Snoowrap.RedditUser) => {
            this.emit('comment', user, comment)
        }).bind(this))
    }

    private onSubmission(submission: Snoowrap.Submission): void {
        void submission.author.fetch().then( ((user: Snoowrap.RedditUser) => {
            this.emit('submission', user, submission)
        }).bind(this))
    }

    //
    //  Error Handling
    //
    private onError(error: any){
        this.emit('error', error)
    }
}