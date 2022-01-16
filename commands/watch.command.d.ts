import Discord from 'discord.js';
import commandBase from '../core/command.class';
declare class watchCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare class unwatchCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
}
declare const _default: {
    commands: (watchCommand | unwatchCommand)[];
};
export default _default;
