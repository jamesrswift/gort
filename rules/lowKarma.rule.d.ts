import action from '../core/action.class';
import { conditional } from '../core/condition.class';
import ruleBase, { targetType } from '../core/rule.class';
export declare class lowKarmaRule extends ruleBase {
    name: string;
    targetType: targetType;
    Condition: conditional;
    Action: action;
}
declare const _default: {
    rules: lowKarmaRule[];
};
export default _default;
