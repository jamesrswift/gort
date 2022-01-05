import action from '../action.class'
import Snoowrap from 'snoowrap'
import { RedditProvider } from '../providers/reddit.provider';

interface BanOptions {
    banMessage?: string;
    banReason?: string;
    duration?: number;
    banNote?: string;
}

export default class banAction extends action {

    private _sOpts: BanOptions;

    constructor(opts: BanOptions = {}) {
        super();
        this._sOpts = opts
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) {
        RedditProvider.Instance.getTargetSubreddit().banUser({
            name: user.name,
            banMessage: this._sOpts.banMessage,
            banReason: this._sOpts.banReason,
            duration: this._sOpts.duration,
            banNote: this._sOpts.banNote
        })
    }

}