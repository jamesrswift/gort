import actionClass from '../core/action.class';
import { conditional } from '../core/condition.class';
import ruleBase, { targetType } from '../core/rule.class';
export declare class toxicityRule extends ruleBase {
    name: string;
    targetType: targetType;
    Condition: conditional;
    Action: actionClass;
}
declare const _default: {
    rules: toxicityRule[];
};
export default _default;
