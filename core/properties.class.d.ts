import Snoowrap from 'snoowrap';
export declare class executable<Type> {
    private _value?;
    constructor(value?: Type);
    execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<Type>;
}
export declare class conditional extends executable<boolean> {
}
export declare class countable extends executable<number> {
}
export declare class listable extends executable<string[]> {
}
export declare class legible extends executable<string> {
}
