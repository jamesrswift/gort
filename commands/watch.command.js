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
const ignored_manager_1 = __importDefault(require("../core/managers/ignored.manager"));
const watched_manager_1 = __importDefault(require("../core/managers/watched.manager"));
const usernotes_provider_1 = __importDefault(require("../core/providers/usernotes.provider"));
const logging_1 = require("../core/logging");
const logger = logging_1.logging.getLogger('core.commands.watched');
class watchCommand extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'watch';
        this.description = 'add a user to the watchlist';
        this.usage = 'watch <name> [... reason]';
    }
    execute(args, cmd, discordMessage) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let cmdArguments = [...args];
            const username = (_a = cmdArguments.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const message = cmdArguments.join(' ');
            // Validate usage
            if (username == undefined) {
                logger.warn(`Malformed command, no action taken! Correct usage: ${this.usage}`);
                return `Malformed command, no action taken! Correct usage: ${this.usage}`;
            }
            // Check if user is already watched
            if (yield watched_manager_1.default.Instance.isUserWatched(username)) {
                const info = yield watched_manager_1.default.Instance.getWatchedUserInfo(username);
                logger.warn(`${username} is already watched. Actioned by ${info.actioner}. Message: ${info.message}`);
                return `${username} is already watched. Actioned by ${info.actioner}. Message: ${info.message}`;
            }
            // Check if user is presently ignored
            let bIgnored = yield ignored_manager_1.default.Instance.isUserIgnored(username);
            if (bIgnored) {
                yield ignored_manager_1.default.Instance.removeIgnoredUser(username);
            }
            // Add user to watchlist
            watched_manager_1.default.Instance.addWatchedUser(username, discordMessage.author.username, message);
            // Add usernote
            usernotes_provider_1.default.Instance.addUsernoteByName(username, `[GORT] User was added to watchlist by ${discordMessage.author.username}. Message: ${message}`);
            // Notify
            logger.info(`Adding ${username} to the watched list.` +
                (bIgnored ? 'User was unignored in the process.' : ''));
            return (`Adding ${username} to the watched list.` +
                (bIgnored ? 'User was unignored in the process.' : ''));
        });
    }
}
class unwatchCommand extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'unwatch';
        this.description = 'remove a user to the watchlist';
        this.usage = 'unwatch <name>';
    }
    execute(args, cmd, discordMessage) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let cmdArguments = [...args];
            const username = (_a = cmdArguments.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const message = cmdArguments.join(' ');
            // Validate usage
            if (username == undefined) {
                logger.warn(`Malformed command, no action taken! Correct usage: ${this.usage}`);
                return `Malformed command, no action taken! Correct usage: ${this.usage}`;
            }
            if (!(yield watched_manager_1.default.Instance.isUserWatched(username))) {
                logger.warn(`User ${username} is not presently being watched. No action taken.`);
                return `User ${username} is not presently being watched. No action taken.`;
            }
            yield watched_manager_1.default.Instance.removeWatchedUser(username);
            logger.info(`User ${username} has been removed from the watchlist.`);
            return `User ${username} has been removed from the watchlist.`;
        });
    }
}
exports.default = {
    commands: [new watchCommand(), new unwatchCommand()],
};
