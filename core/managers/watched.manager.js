"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchedUser = void 0;
const logging_1 = require("../logging");
const database_provider_1 = __importDefault(require("../providers/database.provider"));
const WatchedUsersSchema = new database_provider_1.default.Schema({
    name: String,
    actioner: String,
    message: String,
}, { strict: false });
exports.WatchedUser = database_provider_1.default.model('watchedusers', WatchedUsersSchema);
const logger = logging_1.logging.getLogger('core.manager.watchedManager');
class watchedManager {
    constructor() { }
    static get Instance() {
        return this._instance || (this._instance = new watchedManager());
    }
    addWatchedUser(name, actioner, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isUserWatched(name)) {
                return;
            }
            const watch = new exports.WatchedUser({
                name: name.toLowerCase(),
                actioner: actioner.toLowerCase(),
                message: message,
            });
            watch.save();
            return watch;
        });
    }
    removeWatchedUser(name) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.WatchedUser.findOneAndDelete({ name: name.toLowerCase() }, undefined, (error, entry) => {
                if (error)
                    return;
                logger.info(`Removing ${name} from list of watched users.`);
            });
        });
    }
    isUserWatched(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield exports.WatchedUser.exists({ name: user.toLowerCase() }).exec()) != null;
        });
    }
    getWatchedUserInfo(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.WatchedUser.findOne({ name: name.toLowerCase() }).exec();
        });
    }
}
exports.default = watchedManager;
