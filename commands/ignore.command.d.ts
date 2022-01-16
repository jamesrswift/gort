import Discord from 'discord.js';
import commandBase from '../core/command.class';
declare class ignoreCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare class unignoreCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare const _default: {
    commands: (ignoreCommand | unignoreCommand)[];
};
export default _default;
