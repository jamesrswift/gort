/// <reference types="node" />
import Discord from 'discord.js';
import { EventEmitter } from 'stream';
export declare interface DiscordProvider {
    on(event: 'message', listener: (message: Discord.Message) => void): this;
    on(event: 'ready', listener: () => void): this;
}
export declare class DiscordProvider extends EventEmitter {
    private static _instance?;
    static get Instance(): DiscordProvider;
    private constructor();
    private _client;
    onConnection(): void;
    onMessage(message: Discord.Message): void;
    private _channelList;
    getChannel(channelID: string): Promise<Discord.AnyChannel | null | undefined>;
    sendMessage(options: string | Discord.MessagePayload | Discord.MessageOptions, channelID?: string): Promise<Discord.Message>;
}
