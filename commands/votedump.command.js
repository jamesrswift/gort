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
const discord_js_1 = __importDefault(require("discord.js"));
const command_class_1 = __importDefault(require("../core/command.class"));
const logging_1 = require("../core/logging");
const reddit_provider_1 = require("../core/providers/reddit.provider");
const logger = logging_1.logging.getLogger('core.commands.votedump');
class votedumpCommand extends command_class_1.default {
    constructor() {
        super(...arguments);
        this.name = 'votedump';
        this.description = 'send a copy of the current votes for a given thread';
        this.usage = 'votedump <threadid>';
    }
    execute(args, cmd, discordMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const threadID = args.shift();
            // Validate usage
            if (threadID == undefined) {
                logger.warn(`Malformed command, no action taken! Correct usage: ${this.usage}`);
                return `Malformed command, no action taken! Correct usage: ${this.usage}`;
            }
            discordMessage.reply({
                files: [yield this.createAttachment(threadID)],
            });
            return undefined;
        });
    }
    traverseReplies(votes, comments) {
        return __awaiter(this, void 0, void 0, function* () {
            comments.forEach((comment) => {
                votes.set(comment.id, comment.ups - comment.downs);
                this.traverseReplies(votes, comment.replies);
            });
            return void 0;
        });
    }
    createAttachment(threadID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                reddit_provider_1.RedditProvider.Instance.getRedditClient()
                    .getSubmission(threadID)
                    .expandReplies()
                    .then((submission) => __awaiter(this, void 0, void 0, function* () {
                    const votes = new Map();
                    yield this.traverseReplies(votes, submission.comments);
                    resolve(new discord_js_1.default.MessageAttachment(Buffer.from(JSON.stringify(Object.fromEntries(votes), null, 4)), `votes_${threadID}_${new Date().toUTCString()}.txt`));
                }));
            }));
        });
    }
}
exports.default = {
    commands: [new votedumpCommand()],
};
