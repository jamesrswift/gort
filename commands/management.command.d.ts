import commandBase from '../core/command.class';
import Discord from 'discord.js';
declare abstract class ExecuteConsoleCommand extends commandBase {
    abstract _command: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare class updateCommand extends ExecuteConsoleCommand {
    name: string;
    description: string;
    usage: string;
    _command: string;
}
declare class killCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare const _default: {
    commands: (updateCommand | killCommand)[];
};
export default _default;
