"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const logging_1 = require("./logging");
const logger = logging_1.logging.getLogger('core.rule');
class ruleBase {
    pre(args) {
        return true;
    }
    post(args) { }
}
exports.default = ruleBase;
class ruleHandler {
    constructor() {
        this._rulesDirectory = './dist/rules';
        this._ruleArray = new Map();
        this.loadRules();
    }
    static get Instance() {
        return this._instance || (this._instance = new ruleHandler());
    }
    loadRules() {
        logger.info('Loading rules ...');
        const ruleFiles = fs_1.default
            .readdirSync(this._rulesDirectory)
            .filter((file) => file.endsWith('.js'));
        for (const file of ruleFiles) {
            this.loadRule(file);
        }
    }
    loadRule(filename) {
        const rules = require(`../rules/${filename}`).default.rules;
        for (const rule of rules) {
            if (this._ruleArray.has(rule.name)) {
                return logger.error(`Attempting to redefine rule ${rule.name}`);
            }
            logger.info(`Loading rule: ${rule.name}`);
            this._ruleArray.set(rule.name, rule);
        }
    }
    iterateRules(args) {
        args.user.fetch().then((user) => {
            args.user = user;
            for (let [rulename, rule] of this._ruleArray) {
                if (rule.targetType == 'Both' || args.targetType == rule.targetType) {
                    if (rule.pre(args)) {
                        rule.Condition.execute(args).then((value) => {
                            if (value) {
                                logger.info(`Executing rule ${rulename} on ${args.target.permalink}, submitted by ${args.user.name}.`);
                                return rule.Action.execute(args);
                            }
                        })
                            .finally(() => {
                            rule.post(args);
                        });
                    }
                }
            }
        });
    }
}
exports.ruleHandler = ruleHandler;
