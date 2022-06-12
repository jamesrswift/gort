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
const logging_1 = require("../core/logging");
const brigade_manager_1 = __importDefault(require("../core/managers/brigade.manager"));
const discord_provider_1 = require("../core/providers/discord.provider");
const reddit_provider_1 = require("../core/providers/reddit.provider");
const streamable_provider_1 = require("../core/providers/streamable.provider");
const logger = logging_1.logging.getLogger('bot.astro');
class astro {
    constructor() {
        this._channelID = '931921060826349578'; // Brigades channel
        this._listOfSubreddits = [
            // 'NoNewNormal',
            'LockdownSkepticism',
            'badunitedkingdom',
            'coronaviruscirclejerk',
            'ukantilockdown',
            'watchredditdie',
            'banned',
            'badmods',
            // 'testingground4bots',
            'europe',
            // 'coronavirus',
            'ivermectin',
            'LockdownSceptics',
            // 'samharris',
            // 'joerogan',
            'churchofcovid',
            'awakenedtothetruth',
            'srne',
        ];
        this._listOfKeywords = [
            'coughuk',
            'coronavirusuk',
            'coofuk',
            'coviduk',
            'covuk',
            'coronauk',
            'ronauk',
            'monkeypoxuk',
            'lassafeveruk',
        ];
        this._stream = new streamable_provider_1.subredditStream(reddit_provider_1.RedditProvider.Instance, this._listOfSubreddits.join('+'));
        this._stream.on('comment', this.onComment.bind(this));
        this._stream.on('submission', this.onSubmission.bind(this));
        this._stream.on('error', this.onError.bind(this));
    }
    onComment(user, comment) {
        let result = {
            type: 'Comment',
            target: comment,
        };
        // Check comment body for link
        result.linked = this.containsLinkToSubreddit(comment.body_html);
        // Check comment body for keyword
        result.keyword = this.containsKeyword(comment.body_html);
        // Output
        void this.output(result);
    }
    onSubmission(user, submission) {
        var _a, _b, _c, _d;
        let result = {
            type: 'Submission',
            target: submission,
        };
        // Check submission link
        result.linked =
            (_b = this.containsLinkToSubreddit((_a = submission.url) !== null && _a !== void 0 ? _a : '')) !== null && _b !== void 0 ? _b : this.containsLinkToSubreddit((_c = submission.selftext_html) !== null && _c !== void 0 ? _c : '');
        // check submission body for keyword
        result.keyword = this.containsKeyword((_d = submission.selftext_html) !== null && _d !== void 0 ? _d : '');
        // Output
        void this.output(result);
    }
    containsLinkToSubreddit(text) {
        var _a;
        return (_a = brigade_manager_1.default.stringContainsBrigadeLink(text)[0]) === null || _a === void 0 ? void 0 : _a.match;
    }
    containsKeyword(text) {
        // ensure lowercase
        const input = text.toLowerCase();
        this._listOfKeywords.forEach((keyword) => {
            if (input.includes(keyword)) {
                return keyword;
            }
        });
        return undefined;
    }
    onError(...data) { }
    addBrigadeEntryToManager(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (item.linked == undefined)
                return;
            const info = brigade_manager_1.default.stringContainsBrigadeLink(item.linked);
            if (info.length == 0)
                return;
            item.target.subreddit.fetch().then((subreddit) => {
                // Add entry to brigadeManager
                for (const match of info) {
                    brigade_manager_1.default.Instance.addBrigadeEntry(subreddit.display_name, // origin
                    item.target.author.name, // originator
                    match.sTargetID // target
                    );
                }
            });
        });
    }
    output(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((item.keyword == undefined || null) &&
                (item.linked == undefined || null)) {
                return; // Do nothing
            }
            // Log output in console
            logger.info(`${item.type} from ${item.target.author.name} on ${item.target.subreddit_name_prefixed}`);
            this.addBrigadeEntryToManager(item);
            // Notify discord
            let embed = new discord_js_1.default.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("We've been mentioned!")
                .setURL('http://reddit.com' + item.target.permalink + '?context=2')
                .setAuthor({ name: item.target.author.name })
                .setTimestamp();
            if (item.type == 'Comment') {
                embed.setDescription(item.target.body_html);
            }
            else {
                embed.setDescription('Linked by top level post: ' + item.target.url); // TO DO: Check that this is actually doing what I expect it to be doing
            }
            embed
                .addFields({
                name: 'Subreddit',
                value: item.target.subreddit_name_prefixed,
            }
            //{ name: 'Thread Title', value: item.target. }
            )
                .setFooter({ text: 'Provided by CensorshipCo' });
            discord_provider_1.DiscordProvider.Instance.sendMessage({ embeds: [embed] }, this._channelID);
        });
    }
}
exports.default = astro;
