import action from '../action.class'
import Snoowrap from 'snoowrap'

export default class removeAction extends action {

    private _bSpam: boolean;

    constructor(spam: boolean = false) {
        super();
        this._bSpam = spam;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) {
        target.remove({ spam: this._bSpam })
    }

}