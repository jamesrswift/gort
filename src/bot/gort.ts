import { Comment, RedditUser, Submission } from 'snoowrap';
import { DiscordProvider } from '../core/providers/discord.provider';
import { RedditProvider } from '../core/providers/reddit.provider';
import { subredditStream } from '../core/providers/streamable.provider';
import { ruleHandler } from '../core/rule.class';
import Discord from 'discord.js';
import astro from './astro';
import { commandHandler } from '../core/command.class';

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
		DiscordProvider.Instance.on(
			'message',
			this.onDiscordMessage.bind(this)
		);
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

	private onDiscordMessage(message: Discord.Message) {
		commandHandler.Instance.onMessage(message);
	}

	private onError(...data: any[]) {}
}
