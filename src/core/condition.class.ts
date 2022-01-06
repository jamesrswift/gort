import Snoowrap from 'snoowrap'

export default abstract class condition {

    public constructor() {}

    public abstract execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) : boolean 

}