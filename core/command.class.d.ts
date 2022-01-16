import Discord from 'discord.js';
export default abstract class commandBase {
    abstract name: string;
    abstract description: string;
    abstract usage: string;
    execute(args: string[], cmd: string, message: Discord.Message): Promise<string | undefined | null>;
}
export declare class commandHandler {
    private _commandsDirectory;
    private _commandArray;
    private static _instance?;
    static get Instance(): commandHandler;
    private static _config;
    private constructor();
    private loadCommands;
    private loadCommand;
    getCommands(): Map<string, commandBase>;
    getHandle(): string;
    onMessage(message: Discord.Message): void;
    private handleInvokeCommand;
}
