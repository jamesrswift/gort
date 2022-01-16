"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wls = exports.whitelist_status = exports.visited = exports.url = exports.upvote_ratio = exports.title = exports.thumbnail = exports.subreddit_subscribers = exports.spoiler = exports.selftext = exports.quarantine = exports.post_hint = exports.pwls = exports.pinned = exports.parent_whitelist_status = exports.over_18 = exports.num_crossposts = exports.num_comments = exports.media_only = exports.locked = exports.is_video = exports.is_self = exports.is_robot_indexable = exports.is_reddit_media_domain = exports.is_original_content = exports.is_meta = exports.is_crosspostable = exports.hide_score = exports.hidden = exports.domain = exports.contest_mode = void 0;
const snoowrap_1 = __importDefault(require("snoowrap"));
const condition_class_1 = require("../condition.class");
function redditSubmissionProperties(propertyName) {
    return class extends condition_class_1.executable {
        constructor() {
            super();
        }
        execute(args) {
            if (args.targetType != 'Submission')
                return Promise.reject();
            if (propertyName in snoowrap_1.default.Submission &&
                args.target[propertyName] !== undefined) {
                // @ts-ignore because we will be sensible.
                return Promise.resolve(
                // @ts-ignore because we will be sensible.
                args.target[propertyName]);
            }
            // @ts-ignore because we will be sensible.
            return Promise.reject();
        }
    };
}
//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.Submission
//----------------------------------------------------------------------------------
class contest_mode extends redditSubmissionProperties('contest_mode') {
}
exports.contest_mode = contest_mode;
class domain extends redditSubmissionProperties('domain') {
}
exports.domain = domain;
class hidden extends redditSubmissionProperties('hidden') {
}
exports.hidden = hidden;
class hide_score extends redditSubmissionProperties('hide_score') {
}
exports.hide_score = hide_score;
class is_crosspostable extends redditSubmissionProperties('is_crosspostable') {
}
exports.is_crosspostable = is_crosspostable;
class is_meta extends redditSubmissionProperties('is_meta') {
}
exports.is_meta = is_meta;
class is_original_content extends redditSubmissionProperties('is_original_content') {
}
exports.is_original_content = is_original_content;
class is_reddit_media_domain extends redditSubmissionProperties('is_reddit_media_domain') {
}
exports.is_reddit_media_domain = is_reddit_media_domain;
class is_robot_indexable extends redditSubmissionProperties('is_robot_indexable') {
}
exports.is_robot_indexable = is_robot_indexable;
class is_self extends redditSubmissionProperties('is_self') {
}
exports.is_self = is_self;
class is_video extends redditSubmissionProperties('is_video') {
}
exports.is_video = is_video;
class locked extends redditSubmissionProperties('locked') {
}
exports.locked = locked;
class media_only extends redditSubmissionProperties('media_only') {
}
exports.media_only = media_only;
class num_comments extends redditSubmissionProperties('num_comments') {
}
exports.num_comments = num_comments;
class num_crossposts extends redditSubmissionProperties('num_crossposts') {
}
exports.num_crossposts = num_crossposts;
class over_18 extends redditSubmissionProperties('over_18') {
}
exports.over_18 = over_18;
class parent_whitelist_status extends redditSubmissionProperties('parent_whitelist_status') {
}
exports.parent_whitelist_status = parent_whitelist_status;
class pinned extends redditSubmissionProperties('pinned') {
}
exports.pinned = pinned;
class pwls extends redditSubmissionProperties('pwls') {
}
exports.pwls = pwls;
class post_hint extends redditSubmissionProperties('post_hint') {
}
exports.post_hint = post_hint;
class quarantine extends redditSubmissionProperties('quarantine') {
}
exports.quarantine = quarantine;
class selftext extends redditSubmissionProperties('selftext') {
}
exports.selftext = selftext;
class spoiler extends redditSubmissionProperties('spoiler') {
}
exports.spoiler = spoiler;
class subreddit_subscribers extends redditSubmissionProperties('subreddit_subscribers') {
}
exports.subreddit_subscribers = subreddit_subscribers;
class thumbnail extends redditSubmissionProperties('thumbnail') {
}
exports.thumbnail = thumbnail;
class title extends redditSubmissionProperties('title') {
}
exports.title = title;
class upvote_ratio extends redditSubmissionProperties('upvote_ratio') {
}
exports.upvote_ratio = upvote_ratio;
class url extends redditSubmissionProperties('url') {
}
exports.url = url;
class visited extends redditSubmissionProperties('visited') {
}
exports.visited = visited;
class whitelist_status extends redditSubmissionProperties('whitelist_status') {
}
exports.whitelist_status = whitelist_status;
class wls extends redditSubmissionProperties('wls') {
}
exports.wls = wls;
