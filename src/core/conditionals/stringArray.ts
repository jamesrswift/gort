import {conditional, executableArguments, listable} from "../condition.class";
import Snoowrap from "snoowrap";

export class arrayIncludes extends conditional {

    private _lhs: listable;
    private _rhs: listable

    public constructor(lhs: listable, rhs: listable) {
        super()
        this._lhs = lhs;
        this._rhs = rhs
    }

    public override execute(args: executableArguments): Promise<boolean> {
        return new Promise<boolean>( async (resolve, reject) => {
            const haystack: string[] = await this._lhs.execute(args)
            const needles: string[] = await this._rhs.execute(args)
            for (let needle of needles) {
                if (haystack.includes(needle)) {
                    resolve(true);
                }
            }
            resolve(false)
        })
    }

}