import condition from "../condition.class";
import { listable } from "../properties.class";
import Snoowrap from "snoowrap";

export class arrayIncludes extends condition {

    private _lhs: listable;
    private _rhs: listable

    public constructor(lhs: listable, rhs: listable) {
        super()
        this._lhs = lhs;
        this._rhs = rhs
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        return new Promise<boolean>( async (resolve, reject) => {
            const haystack: string[] = await this._lhs.execute(user, target)
            const needles: string[] = await this._rhs.execute(user, target)
            for (let needle of needles) {
                if (haystack.includes(needle)) {
                    resolve(true);
                }
            }
            resolve(false)
        })
    }

}