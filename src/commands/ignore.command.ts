import Discord from 'discord.js';
import commandBase from '../core/command.class';
import { logging } from '../core/logging';
import ignoredManager from '../core/managers/ignored.manager';
import watchedManager from '../core/managers/watched.manager';

const logger = logging.getLogger('core.commands.ignore');

class ignoreCommand extends commandBase {
	name = 'ignore';
	description = 'add a user to the ignored user list';
	usage = 'ignore <name>';

	override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {
		let cmdArguments = [...args];

		const username = cmdArguments.shift()?.toLowerCase();

		// Validate usage
		if (username == undefined) {
			logger.warn(
				`Malformed command, no action taken! Correct usage: ${this.usage}`
			);
			return `Malformed command, no action taken! Correct usage: ${this.usage}`;
		}

		// Check if user is already ignored
		if (await ignoredManager.Instance.isUserIgnored(username)) {
			const info = await ignoredManager.Instance.getIgnoredUserInfo(
				username
			);

			logger.warn(
				`${username} is already ignored. Actioned by ${info.actioner}. No action taken.`
			);
			return `${username} is already ignored. Actioned by ${info.actioner}. No action taken.`;
		}

		// Check if user is being watch
		if (await watchedManager.Instance.isUserWatched(username)) {
			const info = await watchedManager.Instance.getWatchedUserInfo(
				username
			);
			logger.warn(
				`${username} is presently watched. Actioned by ${info.actioner}. Message: ${info.message}. No action taken`
			);
			return `${username} is presently watched. Actioned by ${info.actioner}. Message: ${info.message}. No action taken`;
		}

		// Add user to ignored list
		ignoredManager.Instance.addIgnoredUser(
			username,
			discordMessage.author.username
		);

		// Notify
		logger.info(`Adding ${username} to the ignored user list`);
		return `Adding ${username} to the ignored user list`;
	}
}

class unignoreCommand extends commandBase {
	name = 'unignore';
	description = 'remove a user to the ignored user list';
	usage = 'unignore <name>';

	override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {
		let cmdArguments = [...args];

		const username = cmdArguments.shift()?.toLowerCase();

		// Validate usage
		if (username == undefined) {
			logger.warn(
				`Malformed command, no action taken! Correct usage: ${this.usage}`
			);
			return `Malformed command, no action taken! Correct usage: ${this.usage}`;
		}

		// Check if user is already ignored
		if (await ignoredManager.Instance.isUserIgnored(username)) {
			const info = await ignoredManager.Instance.getIgnoredUserInfo(
				username
			);

			ignoredManager.Instance.removeIgnoredUser(username);

			logger.info(
				`Removing ${username} from ignored list (previously added by ${info.actioner})`
			);
			return `Removing ${username} from ignored list (previously added by ${info.actioner})`;
		} else {
			logger.warn(`${username} is not on ignored list. No action taken.`);
			return `${username} is not on ignored list. No action taken.`;
		}
	}
}

export default {
	commands: [new ignoreCommand(), new unignoreCommand()],
};
