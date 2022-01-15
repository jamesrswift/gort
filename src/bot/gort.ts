import { Comment, RedditUser, Submission } from 'snoowrap';
import { DiscordProvider } from '../core/providers/discord.provider';
import { RedditProvider } from '../core/providers/reddit.provider';
import { subredditStream } from '../core/providers/streamable.provider';
import { ruleHandler } from '../core/rule.class';
import Discord from 'discord.js';
import astro from './astro';
import { commandHandler } from '../core/command.class';

import { logging } from '../core/logging';

const logger = logging.getLogger('bot.gort');

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

		DiscordProvider.Instance.on('ready', this.onDiscordReady.bind(this));

		logger.info('Gort class initialized');
	}

	private onDiscordReady() {
		DiscordProvider.Instance.sendMessage('Gort online!');
	}

	private onComment(user: RedditUser, comment: Comment) {
		logger.trace(`Comment by ${user.name} received.`);
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
		logger.trace(`Submission by ${user.name} received.`);
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
		logger.trace(
			`Discord message from ${message.author.username} received.`
		);
		commandHandler.Instance.onMessage(message);
	}

	private onError(...data: any[]) {}
}
