import { logging } from '../logging';

const logger = logging.getLogger('core.manager.brigadeManager');

export default class brigadeManager {
	private static _instance?: brigadeManager;
	public static get Instance(): brigadeManager {
		return this._instance || (this._instance = new brigadeManager());
	}
	private constructor() {}
}
