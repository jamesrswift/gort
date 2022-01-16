import action from '../action.class';
import { executableArguments } from '../condition.class';
/**
 * Remove Action
 *
 * @category Actions
 */
export default class removeAction extends action {
    private _bSpam;
    constructor(spam?: boolean);
    execute(args: executableArguments): Promise<void>;
}
