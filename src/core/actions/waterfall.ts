import action from '../action.class'
import Snoowrap from 'snoowrap'

export default class waterfallAction extends action {

    private _waterfall: action[];

    constructor (...args: action[] ){
        super();
        this._waterfall = args;
    }

    public override execute( user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission ){
        this._waterfall.forEach(element => element.execute(user, target))
    }

}