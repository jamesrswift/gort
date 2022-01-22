"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toxicityRule = void 0;
const actions_1 = require("../core/actions");
const toxicity_1 = require("../core/conditionals/toxicity");
const rule_class_1 = __importDefault(require("../core/rule.class"));
class toxicityRule extends rule_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'toxicity';
        this.targetType = 'Both';
        this.Condition = new toxicity_1.toxitityTrigger({});
        this.Action = new actions_1.notify({
            message: 'Comment/Submission triggered Perspective NLP for either SPAM or TOXICITY',
            color: '#b2c225',
            channelID: '934518268079788042',
        });
    }
}
exports.toxicityRule = toxicityRule;
exports.default = { rules: [new toxicityRule()] };
