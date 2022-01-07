import action from '../action.class'
import Snoowrap from 'snoowrap'
import { logging } from '../logging';

const logger = logging.getLogger('core.action.lock');

export default class lockAction extends action {

    constructor() {
        super();
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) {
        logger.info(`Executing lock action on ${target.id}`)
        // @ts-ignore
        if (!target.locked) {
            // @ts-ignore
            target.lock()
        }
    }

}
