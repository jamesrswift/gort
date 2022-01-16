import action from '../action.class';
import { logging } from '../logging';
import { executableArguments } from '../condition.class';
import UsernotesProvider from '../providers/usernotes.provider';

const logger = logging.getLogger('core.action.usernote');

/**
 * Usernote Action
 *
 * @category Actions
 */
export default class usernoteAction extends action {

    protected _message?: string;

    /**
     * @param message  Static message to be added to user's usernotes
     */
	constructor(message?: string) {
		super();
        this._message= message;
	}

    /**
     * @param args  Structured information regarding the user, comment,
     *              submission and other factors relating to the pipeline
     * @returns Dynamic message to be added to the user's usernotes
     */
    public async usernoteGenerator(args: executableArguments): Promise<string>{
        return this._message ?? "No Message Provided!"
    }

    /**
     * @param args  Structured information regarding the user, comment,
     *              submission and other factors relating to the pipeline
     */
	public override async execute(args: executableArguments) {
		logger.info(`Executing lock action on ${args.target.id}`);
		UsernotesProvider.Instance.addUsernoteByName( args.user.name, await this.usernoteGenerator(args))
	}
}
