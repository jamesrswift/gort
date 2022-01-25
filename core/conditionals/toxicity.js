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
exports.toxitityTrigger = void 0;
const perspectiveapi_js_client_1 = require("@conversationai/perspectiveapi-js-client");
const dotenv_1 = __importDefault(require("dotenv"));
const condition_class_1 = require("../condition.class");
const helper_lib_1 = require("../lib/helper.lib");
class toxitityTrigger extends condition_class_1.executable {
    constructor(options) {
        super();
        this._APIKey = '';
        this.thresholds = new Map([
            ['TOXICITY', 0.95],
            ['SEVERE_TOXICITY', 0.95],
            ['IDENTITY_ATTACK', 0.95],
            ['INSULT', 0.95],
            ['PROFANITY', 0.95],
            ['THREAT', 0.95],
            // Experimental values:
            ['SEXUALLY_EXPLICIT', 0.95],
            ['FLIRTATION', 0.95],
            // New York Times attributes:
            ['ATTACK_ON_AUTHOR', 0.95],
            ['ATTACK_ON_COMMENTER', 0.95],
            ['INCOHERENT', 0.95],
            ['INFLAMMATORY', 0.95],
            // Disabled
            ['UNSUBSTANTIAL', 2],
            ['LIKELY_TO_REJECT', 2],
            ['OBSCENE', 2],
            ['SPAM', 2], // Irrelevant and unsolicited commercial content.
        ]);
        dotenv_1.default.config();
        (this._APIKey = (0, helper_lib_1.OrFail)(process.env.PERSPECTIVE_API)),
            (this._client = new perspectiveapi_js_client_1.Client(this._APIKey));
        this._options = options;
        this._options.attributes = Array.from(this.thresholds.keys());
    }
    scoresDecision(args, value) {
        const triggered = [];
        for (const [key, threshold] of this.thresholds) {
            if (value[key] == undefined || value[key] == null)
                continue;
            if (value[key] >= threshold) {
                triggered.push(`${key.toLowerCase()} (${value[key].toFixed(2)})`);
            }
        }
        args.cookies['toxicity_triggered'] = triggered !== null && triggered !== void 0 ? triggered : [];
        return args.cookies['toxicity_triggered'].length > 0;
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = args.targetType == 'Comment'
                ? args.target.body
                : args.target.selftext;
            if (content == null)
                return Promise.resolve(false);
            if (content.length == 0)
                return Promise.resolve(false);
            return new Promise((resolve, reject) => {
                this._client
                    .getScores(content.substring(0, 2900), this._options)
                    .then((value) => {
                    resolve(this.scoresDecision(args, value));
                });
            });
        });
    }
}
exports.toxitityTrigger = toxitityTrigger;
