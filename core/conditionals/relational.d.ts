import { executable, executableArguments } from '../condition.class';
declare abstract class relationalOperator<tLHS, tRHS, tReturn> extends executable<tReturn> {
    private _lhs;
    private _rhs;
    constructor(lhs: executable<tLHS>, rhs: executable<tRHS>);
    execute(args: executableArguments): Promise<tReturn>;
    protected abstract _predicate(lhs: tLHS, rhs: tRHS): tReturn;
}
export declare class equals<Type> extends relationalOperator<Type, Type, boolean> {
    protected _predicate(lhs: Type, rhs: Type): boolean;
}
export declare class notequals<Type> extends relationalOperator<Type, Type, boolean> {
    protected _predicate(lhs: Type, rhs: Type): boolean;
}
export declare class greaterThan<Type> extends relationalOperator<Type, Type, boolean> {
    protected _predicate(lhs: Type, rhs: Type): boolean;
}
export declare class lessThan<Type> extends relationalOperator<Type, Type, boolean> {
    protected _predicate(lhs: Type, rhs: Type): boolean;
}
export declare class greaterThanOrEquals<Type> extends relationalOperator<Type, Type, boolean> {
    protected _predicate(lhs: Type, rhs: Type): boolean;
}
export declare class lessThanOrEquals<Type> extends relationalOperator<Type, Type, boolean> {
    protected _predicate(lhs: Type, rhs: Type): boolean;
}
export {};
