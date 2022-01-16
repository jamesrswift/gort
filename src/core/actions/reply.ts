import action from '../action.class';
import Snoowrap from 'snoowrap';
import { OrDefault } from '../lib/helper.lib';
import { logging } from '../logging';
import { executableArguments } from '../condition.class';

const logger = logging.getLogger('core.action.reply');

interface replyActionOptions {
	distinguish: boolean;
	lock: boolean;
	sticky: boolean;
}

/**
 * Reply Action
 *
 * @category Actions
 */
export default class replyAction extends action {
	private _sOpts: replyActionOptions;
	private _replyText: (
		user: Snoowrap.RedditUser,
		target: Snoowrap.Comment | Snoowrap.Submission
	) => string;

	constructor(
		options: Partial<replyActionOptions>,
		text: (
			user: Snoowrap.RedditUser,
			target: Snoowrap.Comment | Snoowrap.Submission
		) => string
	) {
		super();
		this._sOpts = {
			distinguish: OrDefault(options.distinguish, false),
			lock: OrDefault(options.lock, false),
			sticky: OrDefault(options.sticky, false),
		};
		this._replyText = text;
	}

	public override async execute(args: executableArguments) {
		logger.info(`Executing reply action on ${args.target.id}`);

		// Comment: Not sure I like the below type casting, but from what I can tell from the documentation,
		//          Snoowrap.Comment.reply and Snoowrap.Submission.reply should both return a Promise<Snoowrap.Comment>
		(<Promise<Snoowrap.Comment>>(
			args.target.reply(this._replyText(args.user, args.target))
		)).then((comment: Snoowrap.Comment) => {
			if (this._sOpts.distinguish || this._sOpts.sticky) {
				comment.distinguish({
					status: this._sOpts.distinguish,
					sticky: this._sOpts.sticky,
				});
			}
			if (this._sOpts.lock) {
				// @ts-ignore
				comment.lock();
			}
		});
	}
}
