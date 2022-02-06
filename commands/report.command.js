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
const command_class_1 = __importDefault(require("../core/command.class"));
const logging_1 = require("../core/logging");
const reddit_provider_1 = require("../core/providers/reddit.provider");
const report_banevasion_1 = require("../extensions/report_banevasion");
const logger = logging_1.logging.getLogger('core.commands.report');
class reportCommand extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'report';
        this.description = 'Report ban evasion for a user [EXPERIMENTAL]';
        this.usage = 'report <username>';
    }
    execute(args, cmd, discordMessage) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let cmdArguments = [...args];
            const username = (_a = cmdArguments.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            // Validate usage
            if (username == undefined) {
                logger.warn(`Malformed command, no action taken! Correct usage: ${this.usage}`);
                return `Malformed command, no action taken! Correct usage: ${this.usage}`;
            }
            reddit_provider_1.RedditProvider.Instance.getRedditClient().getUser(username)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                const response = yield (0, report_banevasion_1.reportBanEvasion)(user);
                discordMessage.reply(`Reported ${username} for ban evasion, response: ${response}`);
            })).catch((reason) => {
                // Should never need to be called
                discordMessage.reply(`There was an error reporting user: ${reason}`);
            });
        });
    }
}
exports.default = {
    commands: [new reportCommand()],
};
