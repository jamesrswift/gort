import { notify } from '../core/actions';
import { arrayIncludes } from '../core/conditionals/array';
import ruleBase, { targetType } from '../core/rule.class';
export declare class brigadeRule extends ruleBase {
    name: string;
    targetType: targetType;
    Condition: arrayIncludes<string>;
    Action: notify;
}
declare const _default: {
    rules: brigadeRule[];
};
export default _default;
