import action from '../action.class'
import Snoowrap from 'snoowrap'
import { RedditProvider } from '../providers/reddit.provider';
import { logging } from '../logging';

const logger = logging.getLogger('core.action.ban');

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
        logger.info(`Executing ban action on ${user.name}`);
        RedditProvider.Instance.getTargetSubreddit().banUser({
            name: user.name,
            banMessage: this._sOpts.banMessage,
            banReason: this._sOpts.banReason,
            duration: this._sOpts.duration,
            banNote: this._sOpts.banNote
        })
    }

}