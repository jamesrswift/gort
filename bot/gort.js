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
const command_class_1 = require("../core/command.class");
const logging_1 = require("../core/logging");
const ignored_manager_1 = __importDefault(require("../core/managers/ignored.manager"));
const discord_provider_1 = require("../core/providers/discord.provider");
const reddit_provider_1 = require("../core/providers/reddit.provider");
const streamable_provider_1 = require("../core/providers/streamable.provider");
const rule_class_1 = require("../core/rule.class");
const astro_1 = __importDefault(require("./astro"));
const logger = logging_1.logging.getLogger('bot.gort');
class gort {
    constructor() {
        this._astroturfBot = new astro_1.default();
        this._ownSubredditStream = new streamable_provider_1.subredditStream(reddit_provider_1.RedditProvider.Instance, 'coronavirusuk');
        this._ownSubredditStream.on('comment', this.onComment.bind(this));
        this._ownSubredditStream.on('submission', this.onSubmission.bind(this));
        this._ownSubredditStream.on('error', this.onError.bind(this));
        discord_provider_1.DiscordProvider.Instance.on('message', this.onDiscordMessage.bind(this));
        discord_provider_1.DiscordProvider.Instance.on('ready', this.onDiscordReady.bind(this));
        logger.info('Gort class initialized');
    }
    onDiscordReady() {
        discord_provider_1.DiscordProvider.Instance.sendMessage('Gort online!');
    }
    onComment(user, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.trace(`Comment by ${user.name} received.`);
            // Ignore moderators
            /*if (user.is_mod) {
                logger.info(
                    `Ignoring comment by ${user.name} as they are are a moderator`
                );
                return;
            }*/
            // check if user is ignored?
            if (yield ignored_manager_1.default.Instance.isUserIgnored(user.name)) {
                logger.info(`Ignoring comment by ${user.name} as they are on the ignored user list`);
                return;
            }
            // Iterate rules
            rule_class_1.ruleHandler.Instance.iterateRules({
                target: comment,
                targetType: 'Comment',
                user: user,
                cookies: [],
            });
        });
    }
    onSubmission(user, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.trace(`Submission by ${user.name} received.`);
            // Ignore moderators
            /*if (user.is_mod) {
                logger.info(
                    `Ignoring comment by ${user.name} as they are are a moderator`
                );
                return;
            }*/
            // check if user is ignored?
            if (yield ignored_manager_1.default.Instance.isUserIgnored(user.name)) {
                logger.info(`Ignoring submission by ${user.name} as they are on the ignored user list`);
                return;
            }
            // Iterate rules
            rule_class_1.ruleHandler.Instance.iterateRules({
                target: submission,
                targetType: 'Submission',
                user: user,
                cookies: [],
            });
        });
    }
    onDiscordMessage(message) {
        /*logger.trace(
            `Discord message from ${message.author.username} received.`
        );*/
        command_class_1.commandHandler.Instance.onMessage(message);
    }
    onError(...data) {
        discord_provider_1.DiscordProvider.Instance.sendMessage(data.toString());
        logger.error(data.toString());
    }
}
exports.default = gort;
