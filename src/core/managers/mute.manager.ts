import { logging } from '../logging';

const logger = logging.getLogger('core.manager.muteManager');

export default class muteManager {
	private static _instance?: muteManager;
	public static get Instance(): muteManager {
		return this._instance || (this._instance = new muteManager());
	}
	private constructor() {
		logger.trace('Constructing muteManager instance');
	}

	private _bMuted: boolean = false;
	public get isMuted(): boolean {
		return this._bMuted;
	}
	public set isMuted(toggle: boolean) {
		this.setMuted(toggle);
	}
	public toggleMuted(): boolean {
		return this.setMuted(!this.isMuted);
	}

	public setMuted(toggle: boolean): boolean {
		logger.debug(`muteManager._bMuted = ${toggle}`);
		return (this._bMuted = toggle);
	}
}
