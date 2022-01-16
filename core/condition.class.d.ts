import Snoowrap from 'snoowrap';
import { targetType } from './rule.class';
export interface executableArguments {
    user: Snoowrap.RedditUser;
    target: Snoowrap.Comment | Snoowrap.Submission;
    targetType: Exclude<targetType, 'Both'>;
    cookies: {
        [key: string]: any;
    };
}
export declare class executable<Type> {
    _value?: Type;
    constructor(value?: Type);
    execute(args: executableArguments): Promise<Type>;
}
export declare class conditional extends executable<boolean> {
}
export declare class countable extends executable<number> {
}
export declare class listable extends executable<string[]> {
}
export declare class legible extends executable<string> {
}
