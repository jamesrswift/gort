import { executable, executableArguments } from '../condition.class';
export declare class and extends executable<boolean> {
    private _conditionsType;
    private _conditions;
    constructor(first: executable<boolean> | executable<boolean[]>, ...remainder: executable<boolean>[]);
    execute(args: executableArguments): Promise<boolean>;
    private logic;
}
export declare class or extends executable<boolean> {
    private _conditionsType;
    private _conditions;
    constructor(first: executable<boolean> | executable<boolean[]>, ...remainder: executable<boolean>[]);
    execute(args: executableArguments): Promise<boolean>;
    private logic;
}
export declare class not extends executable<boolean> {
    private _rhs;
    constructor(rhs: executable<boolean>);
    execute(args: executableArguments): Promise<boolean>;
}
export declare class notArray extends executable<boolean[]> {
    private _conditionsType;
    private _conditions;
    constructor(first: executable<boolean> | executable<boolean[]>, ...remainder: executable<boolean>[]);
    execute(args: executableArguments): Promise<boolean[]>;
    private logic;
}
