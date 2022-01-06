import action from '../action.class'
import Snoowrap from 'snoowrap'
import {OrDefault} from '../lib/helper.lib'

interface replyActionOptions {
    distinguish: boolean;
    lock: boolean;
    sticky: boolean;
}

export default class replyAction extends action {

    private _sOpts: replyActionOptions;
    private _replyText: (user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) => string;

    constructor(options: Partial<replyActionOptions>, text: (user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) => string) {
        super();
        this._sOpts = {
            distinguish: OrDefault(options.distinguish, false),
            lock: OrDefault(options.lock, false),
            sticky: OrDefault(options.sticky, false)
        }
        this._replyText = text;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) {

        // Comment: Not sure I like the below type casting, but from what I can tell from the documentation,
        //          Snoowrap.Comment.reply and Snoowrap.Submission.reply should both return a Promise<Snoowrap.Comment>
        (<Promise<Snoowrap.Comment>>target.reply( this._replyText(user, target) )).then( (comment: Snoowrap.Comment) => {
            if ( this._sOpts.distinguish || this._sOpts.sticky ){
                comment.distinguish({
                    status: this._sOpts.distinguish,
                    sticky: this._sOpts.sticky
                })
            }
            if ( this._sOpts.lock ){
                // @ts-ignore
                comment.lock()
            }

        })
    }

}
