import action from '../action.class';
import { executableArguments } from '../condition.class';
import { logging } from '../logging';

const logger = logging.getLogger('core.action.remove');

/**
 * Remove Action
 *
 * @category Actions
 */
export default class removeAction extends action {
	private _bSpam: boolean;

	constructor(spam: boolean = false) {
		super();
		this._bSpam = spam;
	}

	public override async execute(args: executableArguments) {
		args.target.remove({ spam: this._bSpam });
		logger.info(`Executing remove action on ${args.target.id}`);
	}
}
