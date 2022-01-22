import { executable, executableArguments } from '../condition.class';
import { IClientOptions } from '@conversationai/perspectiveapi-js-client';
export declare class toxitityTrigger extends executable<boolean> {
    private _APIKey;
    private _client;
    private _options;
    constructor(options: IClientOptions);
    execute(args: executableArguments): Promise<boolean>;
}
