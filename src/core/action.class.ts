import Snoowrap from 'snoowrap'

export default abstract class action {

    public constructor() { }

    public abstract execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): void

}