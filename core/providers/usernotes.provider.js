"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolbox = __importStar(require("toolbox-api"));
const reddit_provider_1 = require("./reddit.provider");
const logging_1 = require("../../core/logging");
const logger = logging_1.logging.getLogger('core.provider.UsernotesProvider');
class UsernotesProvider {
    constructor() { }
    static get Instance() {
        return this._instance || (this._instance = new UsernotesProvider());
    }
    getUsernotesPage() {
        return new Promise((resolve, reject) => {
            reddit_provider_1.RedditProvider.Instance.getTargetSubreddit()
                .fetch()
                .then((subreddit) => {
                resolve(subreddit.getWikiPage('usernotes').fetch());
            });
        });
    }
    addUsernote(user, note) {
        this.addUsernoteByName(user.name, note);
    }
    addUsernoteByName(user, note) {
        void this.getUsernotesPage().then((wiki) => {
            const usernotes = new toolbox.UsernotesData(wiki.content_md);
            usernotes.addUsernote(user, note);
            reddit_provider_1.RedditProvider.Instance.editWikiPage({
                subreddit: reddit_provider_1.RedditProvider.Instance.getTargetSubreddit(),
                page: wiki,
                page_title: 'usernotes',
                text: JSON.stringify(usernotes),
                reason: 'toolbox modification by gort',
            });
        });
    }
    getUsernotesByName(user) {
        return new Promise((resolve, reject) => {
            void this.getUsernotesPage().then((wiki) => {
                const usernotes = new toolbox.UsernotesData(wiki.content_md);
                // Find username case_insensitive
                Object.keys(usernotes.users).forEach((key) => {
                    if (key.toLowerCase() == user.toLowerCase()) {
                        resolve(usernotes.users[key].ns.map((note) => {
                            return {
                                text: note.n,
                                timestamp: note.t
                                    ? new Date(note.t * 1000)
                                    : undefined,
                                link: note.l &&
                                    toolbox.expandPermalink(note.l),
                            };
                        }));
                    }
                });
                resolve([]);
            });
        });
    }
}
exports.default = UsernotesProvider;
