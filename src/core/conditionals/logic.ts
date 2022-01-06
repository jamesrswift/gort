import condition from "../condition.class";
import Snoowrap from "snoowrap";

export class and extends condition {

    private _conditions: condition[];

    public constructor(...args: condition[]) {
        super();
        this._conditions = args;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        // Build promise array
        let promiseArray: Promise<boolean>[] = [];
        for (let condition of this._conditions) {
            promiseArray.push(condition.execute(user, target))
        }

        // Build return promise
        return new Promise<boolean>((resolve, reject) => {
            Promise.all(promiseArray).then((results) => {
                for (let conditionResult of results) { if (!conditionResult) { resolve(false) } }
                resolve(true)
            }).catch((reason) => { reject(reason) })
        })
    }

}

export class or extends condition {

    private _conditions: condition[];

    public constructor(...args: condition[]) {
        super();
        this._conditions = args;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        // Build promise array
        let promiseArray: Promise<boolean>[] = [];
        for (let condition of this._conditions) {
            promiseArray.push(condition.execute(user, target))
        }

        // Build return promise
        return new Promise<boolean>((resolve, reject) => {
            Promise.all(promiseArray).then((results) => {
                for (let conditionResult of results) { if (conditionResult) { resolve(true) } }
                resolve(false)
            }).catch((reason) => { reject(reason) })
        })
    }


}

export class not extends condition {

    private _rhs: condition;

    public constructor(rhs: condition) {
        super();
        this._rhs = rhs;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._rhs.execute(user, target).then((result: boolean) => { resolve(!result) }).catch((reason) => { reject(reason) })
        })
    }

}