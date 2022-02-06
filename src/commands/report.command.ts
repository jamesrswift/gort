import commandBase, { commandHandler } from '../core/command.class';
import Discord from 'discord.js';
import { logging } from '../core/logging';
import { RedditProvider } from '../core/providers/reddit.provider';
import Snoowrap from 'snoowrap';
import { reportBanEvasion } from '../extensions/report_banevasion';

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

        RedditProvider.Instance.getRedditClient().getUser( username )
        .then( async (user: Snoowrap.RedditUser) => {
            const response = await reportBanEvasion( user );
            discordMessage.reply( `Reported ${username} for ban evasion, response: ${response}`)
        }).catch( (reason:any) => {
            // Should never need to be called
            discordMessage.reply( `There was an error reporting user: ${reason}`)
        })

    }
}

export default {
	commands: [new reportCommand()],
};
