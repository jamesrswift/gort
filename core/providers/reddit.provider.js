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
exports.RedditProvider = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const snoowrap_1 = __importDefault(require("snoowrap"));
const helper_lib_1 = require("../lib/helper.lib");
const events_1 = __importDefault(require("events"));
const streamable_provider_1 = require("./streamable.provider");
class RedditProvider extends events_1.default {
    //
    // Singleton Pattern
    //
    constructor() {
        super();
        dotenv_1.default.config();
        this._client = new snoowrap_1.default({
            userAgent: (0, helper_lib_1.OrFail)(process.env.REDDIT_USERAGENT),
            clientId: (0, helper_lib_1.OrFail)(process.env.REDDIT_CLIENTID),
            clientSecret: (0, helper_lib_1.OrFail)(process.env.REDDIT_CLIENTSECRET),
            username: (0, helper_lib_1.OrFail)(process.env.REDDIT_USERNAME),
            password: (0, helper_lib_1.OrFail)(process.env.REDDIT_PASSWORD),
        });
    }
    static get Instance() {
        return this._instance || (this._instance = new RedditProvider());
    }
    getRedditClient() {
        return this._client;
    }
    /* istanbul ignore next */
    getTargetSubreddit() {
        return this._client.getSubreddit((0, helper_lib_1.OrFail)(process.env.REDDIT_SUBREDDIT));
    }
    //
    // Manage Polling
    //
    /* istanbul ignore next */
    createListeners(subreddit = (0, helper_lib_1.OrFail)(process.env.REDDIT_SUBREDDIT)) {
        return new streamable_provider_1.subredditStream(this, subreddit);
    }
    //
    // Utility due to issues with underlying snoowrap library
    //	see: https://github.com/not-an-aardvark/snoowrap/issues/351
    // 	see: https://github.com/not-an-aardvark/snoowrap/issues/352
    editWikiPage(args) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update wiki object, typing disabled due to issues
            // @ts-ignore
            args.page.subreddit = args.subreddit;
            // @ts-ignore
            args.page.title = args.page_title;
            // Get most recent revision to remove EDIT_CONFLICT error
            const revisions = yield args.page.getRevisions();
            // Update wiki object, typing disabled due to issues
            // @ts-ignore
            args.page.previousRevision = revisions[0].id;
            args.page.edit({
                text: args.text,
                reason: args.reason,
                // @ts-ignore https://github.com/not-an-aardvark/snoowrap/issues/352
                previousRevision: args.page.previousRevision,
            });
        });
    }
}
exports.RedditProvider = RedditProvider;
