import { MessageEmbed } from 'discord.js';
import notifyAction from '../core/actions/notify';
import { executableArguments } from '../core/condition.class';
import { isWatched } from '../core/conditionals/watched';
import ruleBase, { targetType } from '../core/rule.class';
declare class watchedAction extends notifyAction {
    buildEmbed(args: executableArguments, embed: MessageEmbed): Promise<void>;
}
export declare class watchedRule extends ruleBase {
    name: string;
    targetType: targetType;
    Condition: isWatched;
    Action: watchedAction;
}
declare const _default: {
    rules: watchedRule[];
};
export default _default;
