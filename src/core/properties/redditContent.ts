import Snoowrap from "snoowrap";
import { executable, executableArguments } from "../condition.class";

function redditVoteableProperties<K extends keyof Snoowrap.RedditContent<Snoowrap.Comment | Snoowrap.Submission>>(propertyName: K) {
    return class extends executable<Snoowrap.RedditContent<Snoowrap.Comment | Snoowrap.Submission>[K]> {
        constructor() { super() }
        public override execute(args: executableArguments): Promise<Snoowrap.RedditContent<Snoowrap.Comment | Snoowrap.Submission>[K]> {
            return Promise.resolve((<Snoowrap.RedditContent<Snoowrap.Comment | Snoowrap.Submission>>args.target)[propertyName])
        }
    }
}

//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.RedditContent<Snoowrap.Submission>
//----------------------------------------------------------------------------------

export class created_utc extends redditVoteableProperties('created_utc') { };
export class created extends redditVoteableProperties('created') { };
export class id extends redditVoteableProperties('id') { };
export class name extends redditVoteableProperties('name') { };
