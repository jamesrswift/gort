import Snoowrap from 'snoowrap';

function activator<T>(type: { new (): T }): T {
	return new type();
}

export class executable<Type> {
	private _value?: Type;
	public constructor(value?: Type) {
		this._value = value;
	}
	public execute(
		user: Snoowrap.RedditUser,
		target: Snoowrap.Comment | Snoowrap.Submission
	): Promise<Type> {
		if (this._value == undefined)
			return Promise.reject(
				'Undefined generic value in executable<Type>'
			);
		return Promise.resolve(this._value);
	}
}

export class conditional extends executable<boolean> {}
export class countable extends executable<number> {}
export class listable extends executable<string[]> {}
export class legible extends executable<string> {}
