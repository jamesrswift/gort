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
        dotenv_1.default.config();
        (this._APIKey = (0, helper_lib_1.OrFail)(process.env.PERSPECTIVE_API)),
            (this._client = new perspectiveapi_js_client_1.Client(this._APIKey));
        this._options = options;
    }
    scoresDecision(value) {
        if (value['TOXICITY'] > 0.95)
            return true;
        if (value['SEVERE_TOXICITY'] > 0.95)
            return true;
        if (value['IDENTITY_ATTACK'] > 0.95)
            return true;
        if (value['INSULT'] > 0.95)
            return true;
        if (value['PROFANITY'] > 0.95)
            return true;
        if (value['THREAT'] > 0.95)
            return true;
        // Experimental values:
        if (value['SEXUALLY_EXPLICIT'] > 0.95)
            return true;
        if (value['FLIRTATION'] > 0.95)
            return true;
        // New York Times attributes
        if (value['ATTACK_ON_AUTHOR'] > 0.95)
            return true;
        if (value['ATTACK_ON_COMMENTER'] > 0.95)
            return true;
        if (value['INCOHERENT'] > 0.95)
            return true;
        if (value['INFLAMMATORY'] > 0.95)
            return true;
        if (value['LIKELY_TO_REJECT'] > 0.95)
            return true;
        if (value['OBSCENE'] > 0.95)
            return true;
        if (value['SPAM'] > 0.95)
            return true;
        //if ( value['UNSUBSTANTIAL'] > 0.95 ) return true
        return false;
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const html = args.targetType == 'Comment'
                    ? args.target.body_html
                    : args.target.selftext_html;
                if (html == null)
                    return resolve(false);
                this._client
                    .getScores(html, this._options)
                    .then((value) => {
                    resolve(this.scoresDecision(value));
                });
            });
        });
    }
}
exports.toxitityTrigger = toxitityTrigger;
