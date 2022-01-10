import { RedditProvider } from './reddit.provider';
import Snoowrap, { Subreddit } from 'snoowrap';
import SnooStream from '../lib/snoostream.lib';
import Pollify from '../lib/pollify.lib';
import { EventEmitter } from 'stream';

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
	private _redditProvider: RedditProvider;
	private _streamer: SnooStream;
	private _commentStream?: Pollify;
	private _submissionStream?: Pollify;
	private _subreddit: string;

	public constructor(redditProvider: RedditProvider, subreddit: string) {
		super();
		this._redditProvider = redditProvider;
		this._streamer = new SnooStream(this._redditProvider.getRedditClient());
		this._subreddit = subreddit;
		this.createListeners();
	}

	private createListeners(): void {
		this._commentStream = this._streamer.commentStream(this._subreddit, {
			rate: 10000,
		});
		this._commentStream?.on('post', this.onComment.bind(this));
		this._commentStream?.on('error', this.onError.bind(this));

		this._submissionStream = this._streamer.submissionStream(
			this._subreddit,
			{
				rate: 10000,
			}
		);
		this._submissionStream?.on('post', this.onSubmission.bind(this));
		this._submissionStream?.on('error', this.onError.bind(this));
	}

	//
	//  Event Handling
	//

	private onComment(comment: Snoowrap.Comment): void {
		void comment.author.fetch().then(
			((user: Snoowrap.RedditUser) => {
				this.emit('comment', user, comment);
			}).bind(this)
		);
	}

	private onSubmission(submission: Snoowrap.Submission): void {
		void submission.author.fetch().then(
			((user: Snoowrap.RedditUser) => {
				this.emit('submission', user, submission);
			}).bind(this)
		);
	}

	//
	//  Error Handling
	//
	private onError(error: any) {
		this.emit('error', error);
	}
}
