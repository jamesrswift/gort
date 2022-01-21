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
const usernotes_provider_1 = __importDefault(require("../core/providers/usernotes.provider"));
const logger = logging_1.logging.getLogger('core.commands.usernote');
class addUsernoteCommand extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'addUsernote';
        this.description = 'add a usernote against a username';
        this.usage = 'addUsernote <username> [... note]';
    }
    execute(args, cmd, discordMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let cmdArguments = [...args];
            const username = cmdArguments.shift();
            const message = cmdArguments.join(' ');
            // Validate usage
            if (username == undefined || message.length == 0) {
                logger.warn(`Malformed command, no action taken! Correct usage: ${this.usage}`);
                return `Malformed command, no action taken! Correct usage: ${this.usage}`;
            }
            usernotes_provider_1.default.Instance.addUsernoteByName(username, `[G] ${message} (Sent by ${discordMessage.author.username})`);
            return `Added usernote '${message}' to ${username}`;
        });
    }
}
class getUsernotes extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'getUsernote';
        this.description = 'finds usernotes against a username';
        this.usage = 'getUsernote <username>';
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
            const usernotes = yield usernotes_provider_1.default.Instance.getUsernotesByName(username);
            if (usernotes.length == 0) {
                return 'Not usernotes found';
            }
            let output = '';
            for (const usernote of usernotes) {
                output += `"${usernote.text}"\r\n`;
            }
            return output;
        });
    }
}
exports.default = {
    commands: [new addUsernoteCommand(), new getUsernotes()],
};
