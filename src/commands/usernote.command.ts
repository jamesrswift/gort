import commandBase from '../core/command.class';
import Discord from 'discord.js';

import { logging } from '../core/logging';
import UsernotesProvider from '../core/providers/usernotes.provider';

const logger = logging.getLogger('core.commands.usernote');

class addUsernoteCommand extends commandBase {
	name = 'addUsernote';
	description = 'add a usernote against a username';
	usage = 'addUsernote <username> [... note]';

	override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {
		let cmdArguments = [...args];

		const username = cmdArguments.shift()?.toLowerCase();
		const message = cmdArguments.join(' ');

		// Validate usage
		if (username == undefined || message.length == 0) {
			logger.warn(
				`Malformed command, no action taken! Correct usage: ${this.usage}`
			);
			return `Malformed command, no action taken! Correct usage: ${this.usage}`;
		}

		UsernotesProvider.Instance.addUsernoteByName(
			username,
			`[GORT] Message from ${discordMessage.author.username}: ${message}`
		);

		return `Added usernote '${message}' to ${username}`;
	}
}

class getUsernotes extends commandBase{
    name = 'getUsernote';
	description = 'finds usernotes against a username';
	usage = 'getUsernote <username>';

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

        const usernotes = (await UsernotesProvider.Instance.getUsernotesByName(username))

        if ( usernotes.length == 0 ){
            return "Not usernotes found"
        }

        let output : string = "";
        for ( const usernote of usernotes ){
            output += `"${usernote.text}"\r\n`
        }

        return output
    }

}

export default {
	commands: [new addUsernoteCommand(), new getUsernotes()],
};
