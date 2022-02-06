import commandBase, { commandHandler } from '../core/command.class';
import Discord from 'discord.js';
import { logging } from '../core/logging';
import { RedditProvider } from '../core/providers/reddit.provider';
import { reportBanEvasion } from '../extensions/report_banevasion';
import { DiscordProvider } from '../core/providers/discord.provider';

const logger = logging.getLogger('core.commands.report');

class reportCommand extends commandBase {
	name = 'report';
	description = 'Report ban evasion for a user [EXPERIMENTAL]';
	usage = 'report <username>';

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

        const user = RedditProvider.Instance.getRedditClient().getUser( username )
        const response = await reportBanEvasion( user );
        console.log(response)
        discordMessage.reply( `Reported ${username} for ban evasion, response: ${response}`)
        DiscordProvider.Instance.sendMessage( `REPORT: ${username}`, "913364442274725948")
    }
}

export default {
	commands: [new reportCommand()],
};
