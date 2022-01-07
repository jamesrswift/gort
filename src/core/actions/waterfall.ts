import action from '../action.class'
import Snoowrap from 'snoowrap'
import { logging } from '../logging';

const logger = logging.getLogger('core.action.waterfall');

export default class waterfallAction extends action {

    private _waterfall: action[];

    constructor (...args: action[] ){
        super();
        this._waterfall = args;
    }

    public override execute( user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission ){
        logger.info(`Executing waterfall action...`)
        this._waterfall.forEach(element => element.execute(user, target))
        logger.info(`Executing waterfall action... finished`)
    }

}
