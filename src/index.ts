export default class gort {
	private constructor() {}

	private _instance?: gort;
	public get Instance(): gort {
		return this._instance || (this._instance = new gort());
	}
}
