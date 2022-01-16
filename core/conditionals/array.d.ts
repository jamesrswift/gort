import { executable, executableArguments } from '../condition.class';
export declare class arrayIncludes<Type> extends executable<boolean> {
    private _lhs;
    private _rhs;
    constructor(lhs: executable<Type[]>, rhs: executable<Type>);
    execute(args: executableArguments): Promise<boolean>;
}
export declare class arrayIncludesAny<Type> extends executable<boolean> {
    private _lhs;
    private _rhs;
    constructor(lhs: executable<Type[]>, rhs: executable<Type[]>);
    execute(args: executableArguments): Promise<boolean>;
}
export declare class arrayPop<Type> extends executable<Type> {
    private _lhs;
    constructor(lhs: executable<Type[]>);
    execute(args: executableArguments): Promise<Type>;
}
export declare class arrayPush<Type> extends executable<Type[]> {
    private _lhs;
    private _rhs;
    constructor(lhs: executable<Type[]>, rhs: executable<Type>);
    execute(args: executableArguments): Promise<Type[]>;
}
export declare class arrayConcat<Type> extends executable<Type[]> {
    private _lhs;
    private _rhs;
    constructor(lhs: executable<Type[]>, rhs: executable<Type[]>);
    execute(args: executableArguments): Promise<Type[]>;
}
export declare class arrayIndexOf<Type> extends executable<number> {
    private _lhs;
    private _rhs;
    constructor(lhs: executable<Type[]>, rhs: executable<Type>);
    execute(args: executableArguments): Promise<number>;
}
