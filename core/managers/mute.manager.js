"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("../logging");
const logger = logging_1.logging.getLogger('core.manager.muteManager');
class muteManager {
    constructor() {
        this._bMuted = false;
        logger.trace('Constructing muteManager instance');
    }
    static get Instance() {
        return this._instance || (this._instance = new muteManager());
    }
    get isMuted() {
        return this._bMuted;
    }
    set isMuted(toggle) {
        this.setMuted(toggle);
    }
    toggleMuted() {
        return this.setMuted(!this.isMuted);
    }
    setMuted(toggle) {
        logger.debug(`muteManager._bMuted = ${toggle}`);
        return (this._bMuted = toggle);
    }
}
exports.default = muteManager;
