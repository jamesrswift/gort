import {conditional, executable, executableArguments, listable} from "../condition.class";
import Snoowrap from "snoowrap";

export class arrayIncludes<Type> extends executable<boolean> {
    private _lhs: executable<Type[]>;
    private _rhs: executable<Type>;
    public constructor(lhs: executable<Type[]>, rhs: executable<Type>) { 
        super() 
        this._lhs = lhs;
        this._rhs = rhs;
    }
    
    public override execute(args: executableArguments): Promise<boolean> {
        return new Promise<boolean>( async (resolve, reject) => {
            resolve( (await this._lhs.execute(args)).includes(await this._rhs.execute(args)) )
        });
    }
}

export class arrayIncludesAny<Type> extends executable<boolean> {
    private _lhs: executable<Type[]>;
    private _rhs: executable<Type[]>;
    public constructor(lhs: executable<Type[]>, rhs: executable<Type[]>) { 
        super() 
        this._lhs = lhs;
        this._rhs = rhs;
    }
    
    public override execute(args: executableArguments): Promise<boolean> {
        return new Promise<boolean>( async (resolve, reject) => {
            const haystack = await this._lhs.execute(args);
            resolve((await this._rhs.execute(args)).some( v => haystack.includes(v)) )
        });
    }
}