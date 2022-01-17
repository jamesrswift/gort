import Discord from 'discord.js';
import commandBase from '../core/command.class';
declare class votedumpCommand extends commandBase {
    name: string;
    description: string;
    usage: string;
    execute(args: string[], cmd: string, discordMessage: Discord.Message): Promise<string | undefined | null>;
    private traverseReplies;
    private createAttachment;
}
declare const _default: {
    commands: votedumpCommand[];
};
export default _default;
