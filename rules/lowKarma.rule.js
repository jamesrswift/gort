"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowKarmaRule = void 0;
const actions_1 = require("../core/actions");
const condition_class_1 = require("../core/condition.class");
const relational_1 = require("../core/conditionals/relational");
const user_1 = require("../core/properties/user");
const rule_class_1 = __importDefault(require("../core/rule.class"));
class lowKarmaRule extends rule_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'LowKarmaRule';
        this.targetType = 'Both';
        this.Condition = new relational_1.lessThanOrEquals(new user_1.comment_karma(), new condition_class_1.countable(5));
        this.Action = new actions_1.notify({
            message: 'User has low comment karma',
            color: '#a363d9',
            channelID: '934517919013011486',
        });
    }
}
exports.lowKarmaRule = lowKarmaRule;
exports.default = { rules: [new lowKarmaRule()] };
