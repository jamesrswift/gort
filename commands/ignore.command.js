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
const ignored_manager_1 = __importDefault(require("../core/managers/ignored.manager"));
const watched_manager_1 = __importDefault(require("../core/managers/watched.manager"));
const logger = logging_1.logging.getLogger('core.commands.ignore');
class ignoreCommand extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'ignore';
        this.description = 'add a user to the ignored user list';
        this.usage = 'ignore <name>';
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
            // Check if user is already ignored
            if (yield ignored_manager_1.default.Instance.isUserIgnored(username)) {
                const info = yield ignored_manager_1.default.Instance.getIgnoredUserInfo(username);
                logger.warn(`${username} is already ignored. Actioned by ${info.actioner}. No action taken.`);
                return `${username} is already ignored. Actioned by ${info.actioner}. No action taken.`;
            }
            // Check if user is being watch
            if (yield watched_manager_1.default.Instance.isUserWatched(username)) {
                const info = yield watched_manager_1.default.Instance.getWatchedUserInfo(username);
                logger.warn(`${username} is presently watched. Actioned by ${info.actioner}. Message: ${info.message}. No action taken`);
                return `${username} is presently watched. Actioned by ${info.actioner}. Message: ${info.message}. No action taken`;
            }
            // Add user to ignored list
            ignored_manager_1.default.Instance.addIgnoredUser(username, discordMessage.author.username);
            // Notify
            logger.info(`Adding ${username} to the ignored user list`);
            return `Adding ${username} to the ignored user list`;
        });
    }
}
class unignoreCommand extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'unignore';
        this.description = 'remove a user to the ignored user list';
        this.usage = 'unignore <name>';
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
            // Check if user is already ignored
            if (yield ignored_manager_1.default.Instance.isUserIgnored(username)) {
                const info = yield ignored_manager_1.default.Instance.getIgnoredUserInfo(username);
                ignored_manager_1.default.Instance.removeIgnoredUser(username);
                logger.info(`Removing ${username} from ignored list (previously added by ${info.actioner})`);
                return `Removing ${username} from ignored list (previously added by ${info.actioner})`;
            }
            else {
                logger.warn(`${username} is not on ignored list. No action taken.`);
                return `${username} is not on ignored list. No action taken.`;
            }
        });
    }
}
exports.default = {
    commands: [new ignoreCommand(), new unignoreCommand()],
};
