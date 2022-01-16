import Snoowrap from 'snoowrap';
import action from '../action.class';
import { executableArguments } from '../condition.class';
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
    private _sOpts;
    private _replyText;
    constructor(options: Partial<replyActionOptions>, text: (user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) => string);
    execute(args: executableArguments): Promise<void>;
}
export {};
