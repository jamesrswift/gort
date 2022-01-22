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
exports.IgnoredUser = void 0;
const logging_1 = require("../logging");
const database_provider_1 = __importDefault(require("../providers/database.provider"));
const IgnoredUsersSchema = new database_provider_1.default.Schema({
    name: String,
    actioner: String,
}, { strict: false });
exports.IgnoredUser = database_provider_1.default.model('ignoredusers', IgnoredUsersSchema);
const logger = logging_1.logging.getLogger('core.manager.ignoredManager');
class ignoredManager {
    constructor() { }
    static get Instance() {
        return this._instance || (this._instance = new ignoredManager());
    }
    addIgnoredUser(name, actioner) {
        return __awaiter(this, void 0, void 0, function* () {
            // TO DO: Unwatch user if necessary
            if (yield this.isUserIgnored(name)) {
                logger.warn(`${name} is already ignored. No action taken`);
                return;
            }
            logger.info(`Adding ${name} to list of ignored users. Actioned by ${actioner}.`);
            const ignore = new exports.IgnoredUser({
                name: name.toLowerCase(),
                actioner: actioner.toLowerCase(),
            });
            ignore.save();
            return ignore;
        });
    }
    removeIgnoredUser(name) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.IgnoredUser.findOneAndDelete({ name: name.toLowerCase() }, undefined, (error, entry) => {
                if (error)
                    return;
                logger.info(`Removing ${name} from list of ignored users.`);
            });
        });
    }
    isUserIgnored(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return exports.IgnoredUser.exists({ name: user.toLowerCase() });
            }
            catch (err) {
                return Promise.resolve(false);
            }
        });
    }
    getIgnoredUserInfo(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.IgnoredUser.findOne({ name: name.toLowerCase() }).exec();
        });
    }
}
exports.default = ignoredManager;
