import Discord from 'discord.js';
import { Comment, RedditUser, Submission } from 'snoowrap';
import { commandHandler } from '../core/command.class';
import { OrFail } from '../core/lib/helper.lib';
import { logging } from '../core/logging';
import ignoredManager from '../core/managers/ignored.manager';
import { DiscordProvider } from '../core/providers/discord.provider';
import { RedditProvider } from '../core/providers/reddit.provider';
import { subredditStream } from '../core/providers/streamable.provider';
import { ruleHandler } from '../core/rule.class';
import astro from './astro';

const logger = logging.getLogger('bot.gort');

export default class gort {
	private _astroturfBot: astro;
	private _ownSubredditStream: subredditStream;

	constructor() {
		this._astroturfBot = new astro();
		this._ownSubredditStream = new subredditStream(
			RedditProvider.Instance,
			OrFail(process.env.REDDIT_SUBREDDIT)
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

	private async onComment(user: RedditUser, comment: Comment) {
		logger.trace(`Comment by ${user.name} received.`);

		// check if user is ignored?
		if (await ignoredManager.Instance.isUserIgnored(user.name)) {
			logger.info(
				`Ignoring comment by ${user.name} as they are on the ignored user list`
			);
			return;
		}

		// Iterate rules
		ruleHandler.Instance.iterateRules({
			target: comment,
			targetType: 'Comment',
			user: user,
			cookies: [],
		});
	}

	private async onSubmission(user: RedditUser, submission: Submission) {
		logger.trace(`Submission by ${user.name} received.`);

		// check if user is ignored?
		if (await ignoredManager.Instance.isUserIgnored(user.name)) {
			logger.info(
				`Ignoring submission by ${user.name} as they are on the ignored user list`
			);
			return;
		}

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

	private onError(...data: any[]) {
		logger.error(data.toString());
		if ( data.toString().includes("ratelimit was exceeded") ){
			return DiscordProvider.Instance.sendMessage("Ratelimit exceeded", "931921081667837984");
		}
		DiscordProvider.Instance.sendMessage(data.toString(), "931921081667837984");
	}
}
