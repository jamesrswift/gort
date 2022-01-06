import action from '../action.class'
import Snoowrap from 'snoowrap'

export default class lockAction extends action {

    constructor() {
        super();
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) {
        // @ts-ignore
        if (!item.locked) {
            // @ts-ignore
            item.lock()
        }
    }

}
