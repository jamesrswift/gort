"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ups = exports.subreddit_name_prefixed = exports.subreddit_id = exports.stickied = exports.send_replies = exports.score = exports.saved = exports.permalink = exports.num_reports = exports.no_follow = exports.mod_reason_title = exports.mod_reason_by = exports.mod_note = exports.gilded = exports.downs = exports.can_mod_post = exports.can_gild = exports.author_patreon_flair = exports.author_fullname = exports.archived = void 0;
const condition_class_1 = require("../condition.class");
function redditVoteableProperties(propertyName) {
    return class extends condition_class_1.executable {
        constructor() {
            super();
        }
        execute(args) {
            return Promise.resolve(args.target[propertyName]);
        }
    };
}
//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.VoteableContent<Snoowrap.Submission>
//----------------------------------------------------------------------------------
class archived extends redditVoteableProperties('archived') {
}
exports.archived = archived;
class author_fullname extends redditVoteableProperties('author_fullname') {
}
exports.author_fullname = author_fullname;
class author_patreon_flair extends redditVoteableProperties('author_patreon_flair') {
}
exports.author_patreon_flair = author_patreon_flair;
class can_gild extends redditVoteableProperties('can_gild') {
}
exports.can_gild = can_gild;
class can_mod_post extends redditVoteableProperties('can_mod_post') {
}
exports.can_mod_post = can_mod_post;
class downs extends redditVoteableProperties('downs') {
}
exports.downs = downs;
class gilded extends redditVoteableProperties('gilded') {
}
exports.gilded = gilded;
class mod_note extends redditVoteableProperties('mod_note') {
}
exports.mod_note = mod_note;
class mod_reason_by extends redditVoteableProperties('mod_reason_by') {
}
exports.mod_reason_by = mod_reason_by;
class mod_reason_title extends redditVoteableProperties('mod_reason_title') {
}
exports.mod_reason_title = mod_reason_title;
class no_follow extends redditVoteableProperties('no_follow') {
}
exports.no_follow = no_follow;
class num_reports extends redditVoteableProperties('num_reports') {
}
exports.num_reports = num_reports;
class permalink extends redditVoteableProperties('permalink') {
}
exports.permalink = permalink;
class saved extends redditVoteableProperties('saved') {
}
exports.saved = saved;
class score extends redditVoteableProperties('score') {
}
exports.score = score;
class send_replies extends redditVoteableProperties('send_replies') {
}
exports.send_replies = send_replies;
class stickied extends redditVoteableProperties('stickied') {
}
exports.stickied = stickied;
class subreddit_id extends redditVoteableProperties('subreddit_id') {
}
exports.subreddit_id = subreddit_id;
class subreddit_name_prefixed extends redditVoteableProperties('subreddit_name_prefixed') {
}
exports.subreddit_name_prefixed = subreddit_name_prefixed;
class ups extends redditVoteableProperties('ups') {
}
exports.ups = ups;
