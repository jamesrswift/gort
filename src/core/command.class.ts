import Discord from 'discord.js';
import fs from 'fs';
import { OrDefault } from './lib/helper.lib';
import dotenv from 'dotenv';
import { logging } from './logging';

const logger = logging.getLogger('core.command');

export default abstract class commandBase {
	abstract name: string;
	abstract description: string;
	abstract usage: string;

	async execute(
		args: string[],
		cmd: string,
		message: Discord.Message
	): Promise<string | undefined | null> {
		return undefined;
	}
}

export class commandHandler {
	private _commandsDirectory: string = './dist/commands';
	private _commandArray: Map<string, commandBase> = new Map<
		string,
		commandBase
	>();

	private static _instance?: commandHandler;
	public static get Instance(): commandHandler {
		return this._instance || (this._instance = new commandHandler());
	}

	private static _config: { prefix: string; name: string } = {
		prefix: '&',
		name: 'gort',
	};

	private constructor() {
		dotenv.config();
		commandHandler._config.prefix = OrDefault(
			process.env.DISCORD_COMMAND_PREFIX,
			commandHandler._config.prefix
		);
		commandHandler._config.name = OrDefault(
			process.env.DISCORD_COMMAND_PREFIX,
			commandHandler._config.name
		);
		this.loadCommands();
	}

	private loadCommands() {
		logger.info('Loading commands ...');
		const ruleFiles = fs
			.readdirSync(this._commandsDirectory)
			.filter((file) => file.endsWith('.js'));
		for (const file of ruleFiles) {
			this.loadCommand(file);
		}
	}

	private loadCommand(filename: string) {
		const commands: commandBase[] = (
			require(`../rules/${filename}`) as {
				default: { commands: commandBase[] };
			}
		).default.commands;

		commands.forEach((command) => {
			if (this._commandArray.has(command.name)) {
				return logger.error(
					`Attempting to redefine rule ${command.name}`
				);
			}
			logger.info(`Loading rule: ${command.name}`);
			this._commandArray.set(command.name.toLowerCase(), command);
		});
	}

	public getCommands(): Map<string, commandBase> {
		return this._commandArray;
	}

	public getHandle(): string {
		return commandHandler._config.prefix + commandHandler._config.name;
	}

	public onMessage(message: Discord.Message): void {
		if (message.author.bot) return;
		if (
			message.content
				.substring(0, this.getHandle().length)
				.toLowerCase() != this.getHandle().toLowerCase()
		) {
			return;
		}

		const cmd = message.content.slice(this.getHandle().length).trim();
		const args = cmd.split(/ +/);
		const commandName = args.shift()?.toLowerCase() ?? '';

		if (!this._commandArray.has(commandName)) return;
		const command = this._commandArray.get(commandName);
		if (command == undefined) return;

		this.handleInvokeCommand(message, command, args, cmd);
	}

	private async handleInvokeCommand(
		message: Discord.Message,
		command: commandBase,
		args: string[],
		cmd: string
	) {
		try {
			logger.info(`Chat command called: ${cmd}`);
			const response = await command.execute(args, cmd, message);
			if (response != undefined && response != null) {
				message.reply(response);
			}
		} catch (error: any) {
			logger.error(`Chat command error! ${error}`);
			void message.reply(
				'there was an error trying to execute that command!'
			);
		}
	}
}
