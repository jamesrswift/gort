import { Comment, RedditUser, Submission } from 'snoowrap';
import { RedditProvider } from '../core/providers/reddit.provider';
import { subredditStream } from '../core/providers/streamable.provider';
import { ruleHandler } from '../core/rule.class';
import astro from './astro';

export default class gort {
	private _astroturfBot: astro;
	private _ownSubredditStream: subredditStream;

	constructor() {
		this._astroturfBot = new astro();
		this._ownSubredditStream = new subredditStream(
			RedditProvider.Instance,
			'coronavirusuk'
		);
		this._ownSubredditStream.on('comment', this.onComment.bind(this));
		this._ownSubredditStream.on('submission', this.onSubmission.bind(this));
		this._ownSubredditStream.on('error', this.onError.bind(this));
	}

	private onComment(user: RedditUser, comment: Comment) {
		// check if user is ignored?

		// Iterate rules
		ruleHandler.Instance.iterateRules({
			target: comment,
			targetType: 'Comment',
			user: user,
			cookies: [],
		});
	}

	private onSubmission(user: RedditUser, submission: Submission) {
		// check if user is ignored?

		// Iterate rules
		ruleHandler.Instance.iterateRules({
			target: submission,
			targetType: 'Submission',
			user: user,
			cookies: [],
		});
	}

	private onError(...data: any[]) {}
}
