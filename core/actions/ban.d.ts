import action from '../action.class';
import { executableArguments } from '../condition.class';
interface BanOptions {
    banMessage?: string;
    banReason?: string;
    duration?: number;
    banNote?: string;
}
/**
 * Ban Action
 *
 * @category Actions
 */
export default class banAction extends action {
    private _sOpts;
    constructor(opts?: BanOptions);
    execute(args: executableArguments): Promise<void>;
}
export {};
