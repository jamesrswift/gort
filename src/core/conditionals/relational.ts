import { conditional, countable, executable, executableArguments, legible, listable } from "../condition.class";
import Snoowrap from "snoowrap";

//----------------------------------------------------------------------------------
//  Relational arithmetic operations
//----------------------------------------------------------------------------------
abstract class relationalOperator<tLHS, tRHS, tReturn> extends executable<tReturn>{
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
    protected abstract _predicate( lhs: tLHS, rhs: tRHS) : tReturn ;

}

export class equals<Type> extends relationalOperator<Type, Type, boolean> {
    protected override _predicate( lhs: Type, rhs: Type) : boolean { return lhs == rhs; }
}

export class notequals<Type> extends relationalOperator<Type, Type, boolean> {
    protected override _predicate( lhs: Type, rhs: Type) : boolean { return lhs != rhs; }
}

export class greaterThan<Type> extends relationalOperator<Type, Type, boolean> {
    protected override _predicate( lhs: Type, rhs: Type) : boolean { return lhs > rhs; }
}

export class lessThan<Type> extends relationalOperator<Type, Type, boolean> {
    protected override _predicate( lhs: Type, rhs: Type) : boolean { return lhs < rhs; }
}

export class greaterThanOrEquals<Type> extends relationalOperator<Type, Type, boolean> {
    protected override _predicate( lhs: Type, rhs: Type) : boolean { return lhs >= rhs; }
}

export class lessThanOrEquals<Type> extends relationalOperator<Type, Type, boolean> {
    protected override _predicate( lhs: Type, rhs: Type) : boolean { return lhs <= rhs; }
}
