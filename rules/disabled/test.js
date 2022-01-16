"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRule = void 0;
const actions_1 = require("../../core/actions");
const condition_class_1 = require("../../core/condition.class");
const array_1 = require("../../core/conditionals/array");
const logic_1 = require("../../core/conditionals/logic");
const relational_1 = require("../../core/conditionals/relational");
const rule_class_1 = __importDefault(require("../../core/rule.class"));
class testRule extends rule_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'Test Rule';
        this.targetType = 'Both';
        this.Condition = new logic_1.and(new logic_1.or(new array_1.arrayIncludesAny(new condition_class_1.listable(['hello', 'world']), new condition_class_1.listable(['world'])), new relational_1.greaterThan(new condition_class_1.countable(1), new condition_class_1.countable(2))));
        this.Action = new actions_1.ban({});
    }
}
exports.testRule = testRule;
exports.default = { rules: [new testRule()] };
