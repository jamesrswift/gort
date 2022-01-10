import commandBase from '../core/command.class';
import ignoredManager from '../core/managers/ignored.manager';
import watchedManager from '../core/managers/watched.manager';
import Discord from 'discord.js';
import UsernotesProvider from '../core/providers/usernotes.provider';

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
			return `Malformed command, nothing was done! Correct usage: ${this.usage}`;
		}

		// Check if user is already watched
		if (await watchedManager.Instance.isUserWatched(username)) {
			const info = await watchedManager.Instance.getWatchedUserInfo(
				username
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
		UsernotesProvider.Instance.addUsernoteByName(username, `[GORT] User was added to watchlist by ${discordMessage.author.username}. Message: ${message}`)


		// Notify
		return (
			`Adding ${username} to the watched list.` +
			(bIgnored ? 'User was unignored in the process.' : '')
		);
	}
}

export default {
	commands: [new watchCommand()],
};
