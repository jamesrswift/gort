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
            return true; // A rude, disrespectful, or unreasonable comment that is likely to make people leave a discussion.
        if (value['SEVERE_TOXICITY'] > 0.95)
            return true; // A very hateful, aggressive, disrespectful comment or otherwise very likely to make a user leave a discussion or give up on sharing their perspective. This attribute is much less sensitive to more mild forms of toxicity, such as comments that include positive uses of curse words.
        if (value['IDENTITY_ATTACK'] > 0.95)
            return true; // Negative or hateful comments targeting someone because of their identity.
        if (value['INSULT'] > 0.95)
            return true; // Insulting, inflammatory, or negative comment towards a person or a group of people.
        if (value['PROFANITY'] > 0.95)
            return true; // Swear words, curse words, or other obscene or profane language.
        if (value['THREAT'] > 0.95)
            return true; // Describes an intention to inflict pain, injury, or violence against an individual or group.
        // Experimental values:
        if (value['SEXUALLY_EXPLICIT'] > 0.95)
            return true; // Contains references to sexual acts, body parts, or other lewd content.
        if (value['FLIRTATION'] > 0.95)
            return true; // Pickup lines, complimenting appearance, subtle sexual innuendos, etc.
        // New York Times attributes
        if (value['ATTACK_ON_AUTHOR'] > 0.95)
            return true; // Attack on the author of an article or post. 
        if (value['ATTACK_ON_COMMENTER'] > 0.95)
            return true; // Attack on fellow commenter.
        if (value['INCOHERENT'] > 0.95)
            return true; // Difficult to understand, nonsensical.
        if (value['INFLAMMATORY'] > 0.95)
            return true; // Intending to provoke or inflame.
        if (value['LIKELY_TO_REJECT'] > 0.95)
            return true; // Overall measure of the likelihood for the comment to be rejected according to the NYT's moderation.
        if (value['OBSCENE'] > 0.95)
            return true; // Obscene or vulgar language such as cursing.
        if (value['SPAM'] > 0.95)
            return true; // Irrelevant and unsolicited commercial content.
        //if ( value['UNSUBSTANTIAL'] > 0.95 ) return true // Trivial or short comments
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
