import { logging } from '../logging';

const logger = logging.getLogger('core.manager.ignoredManager');

export default class ignoredManager {
    private static _instance?: ignoredManager;
    public static get Instance(): ignoredManager { return this._instance || (this._instance = new ignoredManager()); }
    private constructor() { }
}