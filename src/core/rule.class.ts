import Snoowrap from 'snoowrap'
import action from './action.class';
import condition from './condition.class';

export default abstract class ruleBase {

    abstract name: string;

    abstract target: 'Submissions' | 'Comments' | 'Both'

    abstract Condition: condition

    abstract Action: action;

}