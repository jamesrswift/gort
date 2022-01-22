import { IAttributeScores, IClientOptions } from '@conversationai/perspectiveapi-js-client';
import { executable, executableArguments } from '../condition.class';
export declare class toxitityTrigger extends executable<boolean> {
    private _APIKey;
    private _client;
    private _options;
    constructor(options: IClientOptions);
    scoresDecision(value: IAttributeScores): boolean;
    execute(args: executableArguments): Promise<boolean>;
}