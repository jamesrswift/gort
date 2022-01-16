"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brigadeRule = void 0;
const actions_1 = require("../core/actions");
const array_1 = require("../core/conditionals/array");
const brigaded_1 = require("../core/conditionals/brigaded");
const user_1 = require("../core/properties/user");
const rule_class_1 = __importDefault(require("../core/rule.class"));
class brigadeRule extends rule_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'brigadeRule';
        this.targetType = 'Both';
        this.Condition = new array_1.arrayIncludes(new user_1.subredditHistory(), new brigaded_1.brigadeOrigin());
        this.Action = new actions_1.notify({
            color: '#db3838',
            message: 'This user is potentially brigading! They have a history in a subreddit that has linked to the thread they are now commenting on!',
            channelID: '931921060826349578',
        });
    }
}
exports.brigadeRule = brigadeRule;
exports.default = { rules: [new brigadeRule()] };
