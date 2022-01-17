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
exports.commandHandler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const helper_lib_1 = require("./lib/helper.lib");
const logging_1 = require("./logging");
const logger = logging_1.logging.getLogger('core.command');
class commandBase {
    execute(args, cmd, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return undefined;
        });
    }
}
exports.default = commandBase;
class commandHandler {
    constructor() {
        this._commandsDirectory = './dist/commands';
        this._commandArray = new Map();
        dotenv_1.default.config();
        commandHandler._config.prefix = (0, helper_lib_1.OrDefault)(process.env.DISCORD_COMMAND_PREFIX, commandHandler._config.prefix);
        commandHandler._config.name = (0, helper_lib_1.OrDefault)(process.env.DISCORD_COMMAND_PREFIX, commandHandler._config.name);
        this.loadCommands();
    }
    static get Instance() {
        return this._instance || (this._instance = new commandHandler());
    }
    loadCommands() {
        logger.info('Loading commands ...');
        const ruleFiles = fs_1.default
            .readdirSync(this._commandsDirectory)
            .filter((file) => file.endsWith('.js'));
        for (const file of ruleFiles) {
            this.loadCommand(file);
        }
    }
    loadCommand(filename) {
        const commands = require(`../commands/${filename}`).default.commands;
        commands.forEach((command) => {
            if (this._commandArray.has(command.name)) {
                return logger.error(`Attempting to redefine command ${command.name}`);
            }
            logger.info(`Loading command: ${command.name}`);
            this._commandArray.set(command.name.toLowerCase(), command);
        });
    }
    getCommands() {
        return this._commandArray;
    }
    getHandle() {
        return commandHandler._config.prefix + commandHandler._config.name;
    }
    onMessage(message) {
        var _a, _b;
        if (message.author.bot)
            return;
        if (message.content
            .substring(0, this.getHandle().length)
            .toLowerCase() != this.getHandle().toLowerCase()) {
            return;
        }
        const cmd = message.content.slice(this.getHandle().length).trim();
        const args = cmd.split(/ +/);
        const commandName = (_b = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '';
        if (!this._commandArray.has(commandName))
            return;
        const command = this._commandArray.get(commandName);
        if (command == undefined)
            return;
        this.handleInvokeCommand(message, command, [...args], cmd);
    }
    handleInvokeCommand(message, command, args, cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info(`Chat command called: ${cmd}`);
                const response = yield command.execute(args, cmd, message);
                if (response != undefined && response != null) {
                    message.reply(response);
                }
            }
            catch (error) {
                logger.error(`Chat command error! ${error}`);
                void message.reply('there was an error trying to execute that command!');
            }
        });
    }
}
exports.commandHandler = commandHandler;
commandHandler._config = {
    prefix: '&',
    name: 'gort',
};
