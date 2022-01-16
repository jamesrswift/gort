import action from '../action.class';
import { executableArguments } from '../condition.class';
/**
 * Lock Action
 *
 * @category Actions
 */
export default class lockAction extends action {
    constructor();
    execute(args: executableArguments): Promise<void>;
}
