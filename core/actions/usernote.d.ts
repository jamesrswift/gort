import action from '../action.class';
import { executableArguments } from '../condition.class';
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
    constructor(message?: string);
    /**
     * @param args  Structured information regarding the user, comment,
     *              submission and other factors relating to the pipeline
     * @returns Dynamic message to be added to the user's usernotes
     */
    usernoteGenerator(args: executableArguments): Promise<string>;
    /**
     * @param args  Structured information regarding the user, comment,
     *              submission and other factors relating to the pipeline
     */
    execute(args: executableArguments): Promise<void>;
}
