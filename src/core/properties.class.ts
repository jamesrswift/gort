import Snoowrap from "snoowrap";

export abstract class countable {

    public constructor() {}

    public abstract execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) : number 

}

export abstract class listable {

    public constructor() {}

    public abstract execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) : string[] 

}

export abstract class legible {

    public constructor() {}

    public abstract execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission) : string 

}