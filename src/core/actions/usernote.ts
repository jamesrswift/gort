import action from '../action.class';
import { logging } from '../logging';
import { executableArguments } from '../condition.class';
import UsernotesProvider from '../providers/usernotes.provider';

const logger = logging.getLogger('core.action.usernote');

export default class usernoteAction extends action {

    protected _message?: string;

	constructor(message?: string) {
		super();
        this._message= message;
	}

    public async usernoteGenerator(args: executableArguments): Promise<string>{
        return this._message ?? "No Message Provided!"
    }

	public override async execute(args: executableArguments) {
		logger.info(`Executing lock action on ${args.target.id}`);
		UsernotesProvider.Instance.addUsernoteByName( args.user.name, await this.usernoteGenerator(args))
	}
}
