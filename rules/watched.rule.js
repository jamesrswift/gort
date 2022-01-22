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
exports.watchedRule = void 0;
const notify_1 = __importDefault(require("../core/actions/notify"));
const watched_1 = require("../core/conditionals/watched");
const watched_manager_1 = __importDefault(require("../core/managers/watched.manager"));
const rule_class_1 = __importDefault(require("../core/rule.class"));
class watchedAction extends notify_1.default {
    buildEmbed(args, embed) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield watched_manager_1.default.Instance.getWatchedUserInfo(args.user.name.toLowerCase());
            embed.addField('Actioner', info.actioner);
            embed.addField('Message', info.message);
        });
    }
}
class watchedRule extends rule_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'watchedRule';
        this.targetType = 'Both';
        this.Condition = new watched_1.isWatched();
        this.Action = new watchedAction({
            message: 'User is on watch list',
            //color?: string;
            description: `A watched user has commented on r/${process.env.REDDIT_SUBREDDIT} and has triggered this warning!`,
            //channelID?: string;
        });
    }
}
exports.watchedRule = watchedRule;
exports.default = { rules: [new watchedRule()] };
