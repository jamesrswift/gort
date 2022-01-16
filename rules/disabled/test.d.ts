import action from '../../core/action.class';
import { and } from '../../core/conditionals/logic';
import ruleBase, { targetType } from '../../core/rule.class';
export declare class testRule extends ruleBase {
    name: string;
    targetType: targetType;
    Condition: and;
    Action: action;
}
declare const _default: {
    rules: testRule[];
};
export default _default;
