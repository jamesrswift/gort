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
const action_class_1 = __importDefault(require("../action.class"));
const discord_js_1 = __importDefault(require("discord.js"));
const helper_lib_1 = require("../lib/helper.lib");
const discord_provider_1 = require("../providers/discord.provider");
const logging_1 = require("../logging");
const logger = logging_1.logging.getLogger('core.action.notify');
/**
 * Discord Notification Action
 *
 * @category Actions
 */
class notifyAction extends action_class_1.default {
    constructor(options) {
        super();
        this._sOpts = options;
    }
    buildEmbed(args, embed) {
        return __awaiter(this, void 0, void 0, function* () {
            embed
                .addField('Account Age (days)', Math.ceil((Date.now() / 1000 - args.user.created) / (60 * 60 * 24)).toString(), true)
                .addField('Link Karma', args.user.link_karma.toString(), true)
                .addField('Comment Karma', args.user.comment_karma.toString(), true);
        });
    }
    buildReasonField(args, embed) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this._sOpts.message) !== null && _a !== void 0 ? _a : 'UNDEFINED';
        });
    }
    execute(args) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.default.MessageEmbed()
                .setTitle('Gort Notification')
                .setURL('http://reddit.com' + args.target.permalink + '?context=2')
                .setDescription((0, helper_lib_1.OrDefault)(this._sOpts.description, 'A user has commented on r/CoronavirusUK and has triggered this warning!'))
                .setTimestamp()
                .addField('username', args.user.name)
                // Below relies on undefined behaving as false
                .addField('Content Body', (0, helper_lib_1.textEllipsis)(args.target.body ||
                args.target.selftext, 500));
            yield this.buildEmbed(args, embed);
            embed.addField('Trigger Reason', (_a = (yield this.buildReasonField(args, embed))) !== null && _a !== void 0 ? _a : 'UNDEFINED');
            embed.setFooter({ text: 'Provided by CensorshipCo' });
            embed.setColor((_b = this._sOpts.color) !== null && _b !== void 0 ? _b : '#0099ff');
            discord_provider_1.DiscordProvider.Instance.sendMessage({ embeds: [embed] }, this._sOpts.channelID);
            logger.info(`Executing notify action on ${args.target.id}`);
        });
    }
}
exports.default = notifyAction;
