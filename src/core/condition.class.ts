import Snoowrap from 'snoowrap';
import { targetType } from './rule.class';

export interface executableArguments {
	user: Snoowrap.RedditUser;
	target: Snoowrap.Comment | Snoowrap.Submission;
	targetType: Exclude<targetType, 'Both'>;
	cookies: any[]; // This can be used to pass pertinent information between both the condition and the action
}

export class executable<Type> {
	private _value?: Type;
	public constructor(value?: Type) {
		this._value = value;
	}
	public execute(args: executableArguments): Promise<Type> {
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
