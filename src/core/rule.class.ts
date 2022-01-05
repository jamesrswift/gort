import Snoowrap from 'snoowrap'
import action from './action.class';

export default abstract class ruleBase {

    abstract name: string;

    abstract target : 'Submissions' | 'Comments' | 'Both'

    abstract predicate( user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) : Promise<boolean>

    abstract Action : action;

}