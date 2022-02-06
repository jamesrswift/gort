import commandBase from '../core/command.class';
import Discord from 'discord.js';
declare class reportCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare const _default: {
    commands: reportCommand[];
};
export default _default;
