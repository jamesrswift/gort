import condition from "../condition.class";
import { countable } from "../properties.class";
import Snoowrap from "snoowrap";

export class equals extends condition {

    private _property: countable;
    private _rhs: number;

    public constructor(property: countable, rhs: number) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): boolean {
        return this._property.execute(user, target) == this._rhs
    }

}

export class notequals extends condition {

    private _property: countable;
    private _rhs: number;

    public constructor(property: countable, rhs: number) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): boolean {
        return this._property.execute(user, target) != this._rhs
    }
    
}

export class greaterThan extends condition {

    private _property: countable;
    private _rhs: number;

    public constructor(property: countable, rhs: number) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): boolean {
        return this._property.execute(user, target) > this._rhs
    }
    
}

export class lessThan extends condition {

    private _property: countable;
    private _rhs: number;

    public constructor(property: countable, rhs: number) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): boolean {
        return this._property.execute(user, target) < this._rhs
    }
    
}

export class greaterThanOrEquals extends condition {

    private _property: countable;
    private _rhs: number;

    public constructor(property: countable, rhs: number) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): boolean {
        return this._property.execute(user, target) >= this._rhs
    }
    
}

export class lessThanOrEquals extends condition {

    private _property: countable;
    private _rhs: number;

    public constructor(property: countable, rhs: number) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): boolean {
        return this._property.execute(user, target) <= this._rhs
    }
    
}