import action from '../action.class';
import { executableArguments } from '../condition.class';
import { logging } from '../logging';

const logger = logging.getLogger('core.action.lock');

/**
 * Lock Action
 *
 * @category Actions
 */
export default class lockAction extends action {
	constructor() {
		super();
	}

	public override async execute(args: executableArguments) {
		logger.info(`Executing lock action on ${args.target.id}`);
		// @ts-ignore
		if (!target.locked) {
			// @ts-ignore
			target.lock();
		}
	}
}
