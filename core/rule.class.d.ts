import action from './action.class';
import { conditional, executableArguments } from './condition.class';
export declare type targetType = 'Submission' | 'Comment' | 'Both';
export default abstract class ruleBase {
    abstract name: string;
    abstract targetType: targetType;
    abstract Condition: conditional;
    abstract Action: action;
    pre(args: executableArguments): boolean;
    post(args: executableArguments): void;
}
export declare class ruleHandler {
    private _rulesDirectory;
    private _ruleArray;
    private static _instance?;
    static get Instance(): ruleHandler;
    private constructor();
    private loadRules;
    private loadRule;
    iterateRules(args: executableArguments): void;
}
