import action from '../action.class'
import Snoowrap from 'snoowrap'
import { logging } from '../logging';
import { executableArguments } from '../condition.class';

const logger = logging.getLogger('core.action.lock');

export default class lockAction extends action {

    constructor() {
        super();
    }

    public override execute(args: executableArguments) {
        logger.info(`Executing lock action on ${args.target.id}`)
        // @ts-ignore
        if (!target.locked) {
            // @ts-ignore
            target.lock()
        }
    }

}
