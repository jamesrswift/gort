import action from '../action.class';
import { executableArguments } from '../condition.class';
/**
 * Waterfall Action
 *
 * @category Actions
 */
export default class waterfallAction extends action {
    private _waterfall;
    constructor(...args: action[]);
    execute(args: executableArguments): Promise<void>;
}
