import Discord from 'discord.js';
import commandBase from '../core/command.class';
declare class addUsernoteCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare class getUsernotes extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare const _default: {
    commands: (addUsernoteCommand | getUsernotes)[];
};
export default _default;
