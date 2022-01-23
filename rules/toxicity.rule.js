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
exports.toxicityRule = void 0;
const actions_1 = require("../core/actions");
const toxicity_1 = require("../core/conditionals/toxicity");
const rule_class_1 = __importDefault(require("../core/rule.class"));
class toxicityAction extends actions_1.notify {
    buildEmbed(args, embed) {
        return __awaiter(this, void 0, void 0, function* () {
            embed.addField('Message', args.cookies['toxicity_triggered'].join(","));
        });
    }
}
class toxicityRule extends rule_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'toxicity';
        this.targetType = 'Both';
        this.Condition = new toxicity_1.toxitityTrigger({});
        this.Action = new toxicityAction({
            message: 'Comment/Submission triggered Perspective NLP',
            color: '#b2c225',
            channelID: '934518268079788042',
        });
    }
}
exports.toxicityRule = toxicityRule;
exports.default = { rules: [new toxicityRule()] };
