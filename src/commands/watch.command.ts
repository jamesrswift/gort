import Discord from 'discord.js';
import commandBase from '../core/command.class';
import { logging } from '../core/logging';
import ignoredManager from '../core/managers/ignored.manager';
import watchedManager from '../core/managers/watched.manager';
import UsernotesProvider from '../core/providers/usernotes.provider';

const logger = logging.getLogger('core.commands.watched');

class watchCommand extends commandBase {
	name = 'watch';
	description = 'add a user to the watchlist';
	usage = 'watch <name> [... reason]';

	override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {
		let cmdArguments = [...args];

		const username = cmdArguments.shift()?.toLowerCase();
		const message = cmdArguments.join(' ');

		// Validate usage
		if (username == undefined) {
			logger.warn(
				`Malformed command, no action taken! Correct usage: ${this.usage}`
			);
			return `Malformed command, no action taken! Correct usage: ${this.usage}`;
		}

		// Check if user is already watched
		if (await watchedManager.Instance.isUserWatched(username)) {
			const info = await watchedManager.Instance.getWatchedUserInfo(
				username
			);
			logger.warn(
				`${username} is already watched. Actioned by ${info.actioner}. Message: ${info.message}`
			);
			return `${username} is already watched. Actioned by ${info.actioner}. Message: ${info.message}`;
		}

		// Check if user is presently ignored
		let bIgnored = await ignoredManager.Instance.isUserIgnored(username);
		if (bIgnored) {
			await ignoredManager.Instance.removeIgnoredUser(username);
		}

		// Add user to watchlist
		watchedManager.Instance.addWatchedUser(
			username,
			discordMessage.author.username,
			message
		);

		// Add usernote
		UsernotesProvider.Instance.addUsernoteByName(
			username,
			`[GORT] User was added to watchlist by ${discordMessage.author.username}. Message: ${message}`
		);

		// Notify
		logger.info(
			`Adding ${username} to the watched list.` +
				(bIgnored ? 'User was unignored in the process.' : '')
		);
		return (
			`Adding ${username} to the watched list.` +
			(bIgnored ? 'User was unignored in the process.' : '')
		);
	}
}

class unwatchCommand extends commandBase {
	name = 'unwatch';
	description = 'remove a user to the watchlist';
	usage = 'unwatch <name>';

	override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {
		let cmdArguments = [...args];

		const username = cmdArguments.shift()?.toLowerCase();
		const message = cmdArguments.join(' ');

		// Validate usage
		if (username == undefined) {
			logger.warn(
				`Malformed command, no action taken! Correct usage: ${this.usage}`
			);
			return `Malformed command, no action taken! Correct usage: ${this.usage}`;
		}

		if (!(await watchedManager.Instance.isUserWatched(username))) {
			logger.warn(
				`User ${username} is not presently being watched. No action taken.`
			);
			return `User ${username} is not presently being watched. No action taken.`;
		}

		await watchedManager.Instance.removeWatchedUser(username);
		logger.info(`User ${username} has been removed from the watchlist.`);
		return `User ${username} has been removed from the watchlist.`;
	}
}

export default {
	commands: [new watchCommand(), new unwatchCommand()],
};
