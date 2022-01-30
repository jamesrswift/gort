import Snoowrap from 'snoowrap';
import { EventEmitter } from 'stream';
import Pollify from '../lib/pollify.lib';
import SnooStream, { IPostStreamOptions } from '../lib/snoostream.lib';
import { RedditProvider } from './reddit.provider';

export class pooledSubredditStream extends EventEmitter{

	//
	// Singleton Pattern
	//
	private static _instance?: pooledSubredditStream;
	public static get Instance(): pooledSubredditStream {
		return this._instance || (this._instance = new pooledSubredditStream());
	}
	private constructor() {
		super()
		this._streamer = new SnooStream(this._redditProvider.getRedditClient());
	}

	private _redditProvider: RedditProvider = RedditProvider.Instance;
	private _streamer: SnooStream;
	private _commentStream?: Pollify;
	private _submissionStream?: Pollify;
	private _subredditList : string[] = [];

	private streamOptions: IPostStreamOptions = {
		rate: 15000
	}

	public addSubreddit( subreddit: string){
		if ( !this._subredditList.includes(subreddit) ){
			this._subredditList.push(subreddit);
		}
	}

	public addSubreddits( subreddits : string[]){
		subreddits.forEach(this.addSubreddit.bind(this))
	}

	private get subreddits() : string { return this._subredditList.join("+") };

	public invalidatePolls(){
		// Unlisted
		this._commentStream?.removeAllListeners();
		this._submissionStream?.removeAllListeners()

		this._commentStream = this._streamer.commentStream(this.subreddits, this.streamOptions);
		this._commentStream?.on('post', this.onComment.bind(this));
		this._commentStream?.on('error', this.onError.bind(this));

		this._submissionStream = this._streamer.submissionStream(this.subreddits, this.streamOptions);
		this._submissionStream?.on('post', this.onSubmission.bind(this));
		this._submissionStream?.on('error', this.onError.bind(this));
	}

	//
	//  Event Handling
	//
	private onComment(comment: Snoowrap.Comment): void {
		this.emit('comment', comment.subreddit.display_name.toLowerCase(), comment.author, comment);
	}

	private onSubmission(submission: Snoowrap.Submission): void {
		this.emit('submission', submission.subreddit.display_name.toLowerCase(),  submission.author, submission);
	}

	//
	//  Error Handling
	//
	private onError(error: any) {
		this.emit('error', error);
	}
}


export declare interface subredditStream {
	on(
		event: 'comment',
		listener: (user: Snoowrap.RedditUser, comment: Snoowrap.Comment) => void
	): this;
	on(
		event: 'submission',
		listener: (
			user: Snoowrap.RedditUser,
			submission: Snoowrap.Submission
		) => void
	): this;
	on(event: 'error', listener: (...data: any[]) => void): this;
}

/* istanbul ignore next */
export class subredditStream extends EventEmitter {

	private _subreddit: string;
	private _subreddits: string[]

	public constructor(redditProvider: RedditProvider, subreddit: string) {
		super();
		this._subreddit = subreddit;
		this._subreddits = subreddit.split("+").map( value => value.toLowerCase() )
		pooledSubredditStream.Instance.addSubreddits( this._subreddits )
		pooledSubredditStream.Instance.invalidatePolls();

		pooledSubredditStream.Instance.on('comment', this.onComment.bind(this))
		pooledSubredditStream.Instance.on('submission', this.onSubmission.bind(this))
		pooledSubredditStream.Instance.on('error', this.onError.bind(this))
	}

	//
	//  Event Handling
	//

	private onComment(subreddit: string, user: Snoowrap.RedditUser, comment: Snoowrap.Comment): void {
		if ( this._subreddits.includes( subreddit )){
			this.emit( 'comment', user, comment)
		}
	}

	private onSubmission(subreddit: string, user: Snoowrap.RedditUser, submission: Snoowrap.Submission): void {
		if ( this._subreddits.includes( subreddit )){
			this.emit( 'submission', user, submission)
		}
	}

	//
	//  Error Handling
	//
	private onError(error: any) {
		this.emit('error', error);
	}
}
