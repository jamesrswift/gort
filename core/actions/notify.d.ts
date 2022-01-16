import Discord, { ColorResolvable } from 'discord.js';
import action from '../action.class';
import { executableArguments } from '../condition.class';
interface notifyActionOptions {
    message?: string;
    color?: ColorResolvable;
    description?: string;
    channelID?: string;
}
/**
 * Discord Notification Action
 *
 * @category Actions
 */
export default class notifyAction extends action {
    _sOpts: notifyActionOptions;
    constructor(options: notifyActionOptions);
    buildEmbed(args: executableArguments, embed: Discord.MessageEmbed): Promise<void>;
    buildReasonField(args: executableArguments, embed: Discord.MessageEmbed): Promise<string>;
    execute(args: executableArguments): Promise<void>;
}
export {};
