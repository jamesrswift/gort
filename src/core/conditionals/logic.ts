import condition from "../condition.class";
import Snoowrap from "snoowrap";

export class and extends condition {

    private _conditions: condition[];

    public constructor(...args: condition[]) {
        super();
        this._conditions = args;
    }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): boolean {
        for (let condition of this._conditions) {
            if (condition.execute(user, target) == false) {
                return false;
            }
        }
        return true;
    }

}

export class or extends condition {

    private _conditions: condition[];

    public constructor(...args: condition[]) {
        super();
        this._conditions = args;
    }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): boolean {
        for (let condition of this._conditions) {
            if (condition.execute(user, target) == true) {
                return true;
            }
        }
        return false;
    }

}