import commandBase, { commandHandler } from '../core/command.class';
import Discord from 'discord.js';

class helpCommand extends commandBase {
	name = 'help';
	description = 'show a list of available commands';
	usage = 'help';

	override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {
		let output: string = 'List of commands: \n';

		const commands = commandHandler.Instance.getCommands();
		const commandHandle = commandHandler.Instance.getHandle()
		for (let [commandName, command] of commands) {
			output += `\t${command.name}, \t${command.description}, \t${commandHandle} ${command.usage}`;
		}

		return output;
	}
}

export default {
	commands: [new helpCommand()],
};
