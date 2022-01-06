import Snoowrap from "snoowrap";

export class countable {

    private _quantity: number;
    public constructor(quantity: number = 0) { this._quantity = quantity }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<number> { return Promise.resolve(this._quantity); }

}

export class listable {

    private _array: string[]
    public constructor(array: string[] = new Array<string>()) { this._array = array }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<string[]> { return Promise.resolve(this._array); }

}

export class legible {

    private _string: string;
    public constructor(str: string = "") { this._string = str }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<string> { return Promise.resolve(this._string); }

}