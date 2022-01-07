import { conditional, countable, legible, listable } from "../condition.class";
import Snoowrap from "snoowrap";
import { lchownSync } from "fs";

export class equals extends conditional {

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

export class notequals extends conditional {

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

export class greaterThan extends conditional {

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

export class lessThan extends conditional {

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

export class greaterThanOrEquals extends conditional {

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

export class lessThanOrEquals extends conditional {

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