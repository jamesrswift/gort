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
exports.subredditHistoryRule = void 0;
const actions_1 = require("../core/actions");
const condition_class_1 = require("../core/condition.class");
const user_1 = require("../core/properties/user");
const rule_class_1 = __importDefault(require("../core/rule.class"));
class subredditHistoryRule extends rule_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'UserSubredditHistory';
        this.targetType = 'Both';
        this.badSubreddits = [
            'nonewnormal',
            'lockdownskepticism',
            'lockdowncriticalleft',
            'coronaviruscirclejerk',
            'ukantilockdown',
            'ivermectin',
            'nolockdownsnomasks',
            'greenandpleasant',
            'latestagecapitalism',
            'communism',
            'genzedong',
            'leopardsatemyface',
            'badunitedkingdom',
            'newcoronavirusuk',
            'coronavirusuk2',
            'coronavirusukarchive',
            'lockdownsceptics',
            'coronavirusfos',
            'debatevaccines',
            'churchofcovid',
            'covidrebellionuk',
            'antiwork',
            'joerogan',
            'testingground4bots',
        ];
        /*Condition = new arrayIncludesAny(
            new subredditHistory(),
            this.badSubreddits
        );*/
        this.Condition = new (class extends condition_class_1.conditional {
            constructor(badSubreddits) {
                super();
                this.badSubreddits = [];
                this.badSubreddits = badSubreddits;
            }
            execute(args) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Get subreddit history
                    const history = yield new user_1.subredditHistory().execute(args);
                    // Condition
                    const arrayIntersection = this.badSubreddits.filter((value) => history.includes(value));
                    const condition = arrayIntersection.length > 0;
                    // Set cookie
                    args.cookies['BadSubreddits'] = arrayIntersection !== null && arrayIntersection !== void 0 ? arrayIntersection : [];
                    return condition;
                });
            }
        })(this.badSubreddits);
        this.Action = new (class subredditHistoryNotification extends actions_1.notify {
            buildReasonField(args) {
                var _a;
                return __awaiter(this, void 0, void 0, function* () {
                    return `User contributed to the following subreddits: ${(_a = args.cookies['BadSubreddits']) === null || _a === void 0 ? void 0 : _a.join(', ')}`;
                });
            }
        })({
            color: '#db3838',
            channelID: '934518094804705370',
        });
    }
}
exports.subredditHistoryRule = subredditHistoryRule;
exports.default = { rules: [new subredditHistoryRule()] };
