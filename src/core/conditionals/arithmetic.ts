import condition from "../condition.class";
import { countable } from "../properties.class";
import Snoowrap from "snoowrap";
import { lchownSync } from "fs";

export class equals extends condition {

    private _property: countable;
    private _rhs: countable;

    public constructor(property: countable, rhs: countable) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Promise.all([this._property.execute(user, target), this._rhs.execute(user, target)]).then((results) => {
                resolve(results[0] == results[1])
            }).catch((reason) => { reject(reason) })
        })
    }

}

export class notequals extends condition {

    private _property: countable;
    private _rhs: countable;

    public constructor(property: countable, rhs: countable) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Promise.all([this._property.execute(user, target), this._rhs.execute(user, target)]).then((results) => {
                resolve(results[0] != results[1])
            }).catch((reason) => { reject(reason) })
        })
    }

}

export class greaterThan extends condition {

    private _property: countable;
    private _rhs: countable;

    public constructor(property: countable, rhs: countable) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Promise.all([this._property.execute(user, target), this._rhs.execute(user, target)]).then((results) => {
                resolve(results[0] > results[1])
            }).catch((reason) => { reject(reason) })
        })
    }

}

export class lessThan extends condition {

    private _property: countable;
    private _rhs: countable;

    public constructor(property: countable, rhs: countable) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Promise.all([this._property.execute(user, target), this._rhs.execute(user, target)]).then((results) => {
                resolve(results[0] < results[1])
            }).catch((reason) => { reject(reason) })
        })
    }

}

export class greaterThanOrEquals extends condition {

    private _property: countable;
    private _rhs: countable;

    public constructor(property: countable, rhs: countable) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Promise.all([this._property.execute(user, target), this._rhs.execute(user, target)]).then((results) => {
                resolve(results[0] >= results[1])
            }).catch((reason) => { reject(reason) })
        })
    }

}

export class lessThanOrEquals extends condition {

    private _property: countable;
    private _rhs: countable;

    public constructor(property: countable, rhs: countable) {
        super();
        this._property = property;
        this._rhs = rhs;
    }

    public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Promise.all([this._property.execute(user, target), this._rhs.execute(user, target)]).then((results) => {
                resolve(results[0] <= results[1])
            }).catch((reason) => { reject(reason) })
        })
    }

}