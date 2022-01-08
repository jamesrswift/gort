import Snoowrap from 'snoowrap'
import action from './action.class';
import { conditional, executableArguments } from './condition.class';

export type targetType = 'Submission' | 'Comment' | 'Both';

export default abstract class ruleBase {

    abstract name: string;

    abstract targetType: targetType;

    pre(args: executableArguments): void { }

    abstract Condition: conditional

    abstract Action: action;

    post(args: executableArguments): void { }

}