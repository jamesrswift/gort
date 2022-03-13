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
exports.BrigadeEntry = void 0;
const logging_1 = require("../logging");
const database_provider_1 = __importDefault(require("../providers/database.provider"));
const BrigadeEntrySchema = new database_provider_1.default.Schema({
    origin: String,
    originator: String,
    target: String,
}, { strict: false });
exports.BrigadeEntry = database_provider_1.default.model('brigadeentry', BrigadeEntrySchema);
const logger = logging_1.logging.getLogger('core.manager.brigadeManager');
class brigadeManager {
    constructor() { }
    static get Instance() {
        return this._instance || (this._instance = new brigadeManager());
    }
    addBrigadeEntry(origin, originator, target) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check that it isn't already on the list somehow?
            const entry = new exports.BrigadeEntry({
                origin: origin.toLowerCase(),
                originator: originator.toLowerCase(),
                target: target.toLowerCase(),
            });
            entry.save();
            logger.info(`Adding BrigadeEntry: Origin ${origin}, target ${target}`);
            return entry;
        });
    }
    isTargetOnBrigadeList(target) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield exports.BrigadeEntry.exists({ target: target.toLowerCase() }).exec()) != null;
        });
    }
    getBrigadeEntryInfo(target) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BrigadeEntry.findOne({ target: target.toLowerCase() }).exec();
        });
    }
    static stringContainsBrigadeLink(text) {
        let results = [];
        const Regex = new RegExp(`(?:(?:https?:\/\/)?(?:(?:www|old|new|i|m|[a-z]{2})\\.)?reddit\\.com)?\/r\/${process.env.REDDIT_SUBREDDIT}\/(?:comments\/)?(?<target>[a-z0-9]{6})`, "gm");
        const matches = text.matchAll(Regex);
        for (const match of matches) {
            results.push({
                bContainsLink: true,
                sInput: text,
                sTargetID: match[1],
                match: match[0],
            });
        }
        return results;
    }
}
exports.default = brigadeManager;
