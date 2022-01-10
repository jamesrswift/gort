import { logging } from '../logging';

const logger = logging.getLogger('core.manager.watchedManager');

export default class watchedManager {
	private static _instance?: watchedManager;
	public static get Instance(): watchedManager {
		return this._instance || (this._instance = new watchedManager());
	}
	private constructor() {}
}
