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
const child_process_1 = require("child_process");
class ExecuteConsoleCommand extends command_class_1.default {
    execute(args, cmd, discordMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, child_process_1.exec)(this._command, (error, stdout, stderr) => {
                    if (error)
                        return resolve(`error: ${error.message}`);
                    if (stderr)
                        return resolve(`error: ${stderr}`);
                    resolve(`stdout: ${stdout}`);
                });
            });
        });
    }
}
class updateCommand extends ExecuteConsoleCommand {
    constructor() {
        super(...arguments);
        this.name = 'server_update';
        this.description = 'syncs local repository and compiles';
        this.usage = 'server_update';
        this._command = 'git pull && npm run build';
    }
}
class killCommand extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'server_kill';
        this.description = 'kills the gort instance. Should be rebooted by PM2';
        this.usage = 'server_kill';
    }
    execute(args, cmd, discordMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            process.exit();
            return undefined;
        });
    }
}
exports.default = { commands: [new updateCommand(), new killCommand()] };
