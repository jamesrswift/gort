import action from '../core/action.class';
import { conditional } from '../core/condition.class';
import ruleBase, { targetType } from '../core/rule.class';
export declare class subredditHistoryRule extends ruleBase {
    name: string;
    targetType: targetType;
    badSubreddits: string[];
    Condition: conditional;
    Action: action;
}
declare const _default: {
    rules: subredditHistoryRule[];
};
export default _default;
