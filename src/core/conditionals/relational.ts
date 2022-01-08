import { conditional, countable, executable, executableArguments, legible, listable } from "../condition.class";
import Snoowrap from "snoowrap";

//----------------------------------------------------------------------------------
//  Relational arithmetic operations
//----------------------------------------------------------------------------------

function relationalOperator<tLHS, tRHS, tReturn>(predicate: (lhs: tLHS, rhs: tRHS) => tReturn) {
    return class extends executable<tReturn> {
        private _predicate: (lhs: tLHS, rhs: tRHS) => tReturn = predicate;
        private _lhs: executable<tLHS>;
        private _rhs: executable<tRHS>;
        constructor(lhs: executable<tLHS>, rhs: executable<tRHS>) {
            super();
            this._lhs = lhs;
            this._rhs = rhs;
        }
        public override execute(args: executableArguments): Promise<tReturn> {
            return new Promise<tReturn>(async (resolve, reject) => {
                resolve(this._predicate(await this._lhs.execute(args), await this._rhs.execute(args)))
            })
        }
    }
}

export class equals extends relationalOperator((lhs: any, rhs: any): boolean => { return lhs == rhs }) { };
export class notequals extends relationalOperator((lhs: any, rhs: any): boolean => { return lhs != rhs }) { };
export class greaterThan extends relationalOperator((lhs: any, rhs: any): boolean => { return lhs > rhs }) { };
export class lessThan extends relationalOperator((lhs: any, rhs: any): boolean => { return lhs < rhs }) { };
export class greaterThanOrEquals extends relationalOperator((lhs: any, rhs: any): boolean => { return lhs >= rhs }) { };
export class lessThanOrEquals extends relationalOperator((lhs: any, rhs: any): boolean => { return lhs <= rhs }) { };
