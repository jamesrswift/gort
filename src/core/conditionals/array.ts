import {
	conditional,
	executable,
	executableArguments,
	listable,
} from '../condition.class';
import Snoowrap from 'snoowrap';
import { comment_karma } from '../properties/user';

export class arrayIncludes<Type> extends executable<boolean> {
	private _lhs: executable<Type[]>;
	private _rhs: executable<Type>;
	public constructor(lhs: executable<Type[]>, rhs: executable<Type>) {
		super();
		this._lhs = lhs;
		this._rhs = rhs;
	}

	public override execute(args: executableArguments): Promise<boolean> {
		return new Promise<boolean>(async (resolve, reject) => {
			resolve(
				(await this._lhs.execute(args)).includes(
					await this._rhs.execute(args)
				)
			);
		});
	}
}

export class arrayIncludesAny<Type> extends executable<boolean> {
	private _lhs: executable<Type[]>;
	private _rhs: executable<Type[]>;
	public constructor(lhs: executable<Type[]>, rhs: executable<Type[]>) {
		super();
		this._lhs = lhs;
		this._rhs = rhs;
	}

	public override execute(args: executableArguments): Promise<boolean> {
		return new Promise<boolean>(async (resolve, reject) => {
			const haystack = await this._lhs.execute(args);
			resolve(
				(await this._rhs.execute(args)).some((v) =>
					haystack.includes(v)
				)
			);
		});
	}
}

export class arrayPop<Type> extends executable<Type> {
	private _lhs: executable<Type[]>;
	public constructor(lhs: executable<Type[]>) {
		super();
		this._lhs = lhs;
	}
	public override execute(args: executableArguments): Promise<Type> {
		return new Promise<Type>(async (resolve, reject) => {
			const returnValue = (await this._lhs.execute(args)).pop();
			if (returnValue != undefined) return resolve(returnValue);
			reject('Empty array in arrayPop<Type>');
		});
	}
}

export class arrayPush<Type> extends executable<Type[]> {
	private _lhs: executable<Type[]>;
	private _rhs: executable<Type>;
	public constructor(lhs: executable<Type[]>, rhs: executable<Type>) {
		super();
		this._lhs = lhs;
		this._rhs = rhs;
	}
	public override execute(args: executableArguments): Promise<Type[]> {
		return new Promise<Type[]>(async (resolve, reject) => {
			resolve([
				...(await this._lhs.execute(args)),
				await this._rhs.execute(args),
			]);
		});
	}
}

// export class arraySort<Type> extends executable<Type[]>{

export class arrayConcat<Type> extends executable<Type[]> {
	private _lhs: executable<Type[]>;
	private _rhs: executable<Type[]>;
	public constructor(lhs: executable<Type[]>, rhs: executable<Type[]>) {
		super();
		this._lhs = lhs;
		this._rhs = rhs;
	}
	public override execute(args: executableArguments): Promise<Type[]> {
		return new Promise<Type[]>(async (resolve, reject) => {
			resolve([
				...(await this._lhs.execute(args)),
				...(await this._rhs.execute(args)),
			]);
		});
	}
}

export class arrayIndexOf<Type> extends executable<number> {
	private _lhs: executable<Type[]>;
	private _rhs: executable<Type>;
	public constructor(lhs: executable<Type[]>, rhs: executable<Type>) {
		super();
		this._lhs = lhs;
		this._rhs = rhs;
	}
	public override execute(args: executableArguments): Promise<number> {
		return new Promise<number>(async (resolve, reject) => {
			resolve(
				(await this._lhs.execute(args)).indexOf(
					await this._rhs.execute(args)
				)
			);
		});
	}
}

// export class arrayCopyWithin<Type> extends executable<Type[]>{

// export class arrayFill<Type> extends executable<Type[]>{

// export class arrayShift<Type> extends executable<Type>{

// export class arraySort<Type> extends executable<Type[]>{

// export class arrayUnshift<Type> extends executable<Type[]>{

// export class arrayJoin<Type> extends executable<string>{

// export class arrayLastIndexOf<Type> extends executable<number>{

// export class arraySlice<Type> extends executable<Type[]>{

// export class arrayToString<Type> extends executable<string>{

// export class arrayToLocalString<Type> extends executable<string>{
