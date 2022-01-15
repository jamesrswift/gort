import Discord, { Intents } from 'discord.js';
import { OrDefault, OrFail, textEllipsis } from '../lib/helper.lib';
import dotenv from 'dotenv';
import { EventEmitter } from 'stream';

export declare interface DiscordProvider {
	on(event: 'message', listener: (message: Discord.Message) => void): this;
	on(event: 'ready', listener: () => void): this;
}

export class DiscordProvider extends EventEmitter {
	//
	// Singleton Pattern
	//
	private static _instance?: DiscordProvider;
	public static get Instance(): DiscordProvider {
		return this._instance || (this._instance = new DiscordProvider());
	}

	private constructor() {
		super();
		dotenv.config();
		this._client = new Discord.Client({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
		} as Discord.ClientOptions);
		this._client.on('ready', this.onConnection.bind(this));
		this._client.on('messageCreate', this.onMessage.bind(this));
		void this._client.login(OrFail(process.env.DISCORD_TOKEN));
	}

	private _client: Discord.Client;

	//
	// Event Handling
	//
	onConnection() {
		this.emit('ready');
	}

	onMessage(message: Discord.Message) {
		this.emit('message', message);
	}

	//
	// Channel Management
	//
	private _channelList: Map<string, Discord.AnyChannel | null> = new Map<
		string,
		Discord.AnyChannel
	>();

	public async getChannel(
		channelID: string
	): Promise<Discord.AnyChannel | null | undefined> {
		if (this._channelList.has(channelID))
			return this._channelList.get(channelID);
		return new Promise(
			(
				resolve: (
					value:
						| Discord.AnyChannel
						| PromiseLike<Discord.AnyChannel | null | undefined>
						| null
						| undefined
				) => void,
				reject: (reason?: any) => void
			) => {
				void this._client.channels.fetch(channelID).then((channel) => {
					this._channelList.set(channelID, channel);
					resolve(channel);
				});
			}
		);
	}

	public async sendMessage(
		options: string | Discord.MessagePayload | Discord.MessageOptions,
		channelID?: string
	): Promise<Discord.Message> {
		// Check if muted first
		return (
			(await this.getChannel(
				OrDefault(channelID, OrFail(process.env.DISCORD_CHANNEL))
			)) as Discord.TextChannel
		)?.send(options);
	}
}
