import Snoowrap from "snoowrap";

export class countable {

    private _quantity: number;
    public constructor(quantity: number = 0) {this._quantity = quantity}

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) : number { return this._quantity }

}

export class listable {

    private _array: string[]
    public constructor(array: string[] = new Array<string>()) { this._array = array}

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) : string[] { return this._array;}

}

export class legible {

    private _string: string;
    public constructor(str: string = "") {this._string = str}

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) : string { return this._string }

}