"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subredditHistory = exports.name = exports.id = exports.created = exports.created_utc = exports.verified = exports.pref_show_snoovatar = exports.link_karma = exports.is_mod = exports.is_gold = exports.is_employee = exports.hide_from_robots = exports.has_verified_mail = exports.has_subscribed = exports.has_mod_mail = exports.comment_karma = void 0;
const condition_class_1 = require("../condition.class");
function redditUserProperty(propertyName) {
    return class extends condition_class_1.executable {
        constructor() {
            super();
        }
        execute(args) {
            // @ts-ignore because we will be sensible.
            return Promise.resolve(args.user[propertyName]);
        }
    };
}
//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.RedditUser
//----------------------------------------------------------------------------------
class comment_karma extends redditUserProperty('comment_karma') {
}
exports.comment_karma = comment_karma;
class has_mod_mail extends redditUserProperty('has_mod_mail') {
}
exports.has_mod_mail = has_mod_mail;
class has_subscribed extends redditUserProperty('has_subscribed') {
}
exports.has_subscribed = has_subscribed;
class has_verified_mail extends redditUserProperty('has_verified_mail') {
}
exports.has_verified_mail = has_verified_mail;
class hide_from_robots extends redditUserProperty('hide_from_robots') {
}
exports.hide_from_robots = hide_from_robots;
class is_employee extends redditUserProperty('is_employee') {
}
exports.is_employee = is_employee;
class is_gold extends redditUserProperty('is_gold') {
}
exports.is_gold = is_gold;
class is_mod extends redditUserProperty('is_mod') {
}
exports.is_mod = is_mod;
class link_karma extends redditUserProperty('link_karma') {
}
exports.link_karma = link_karma;
class pref_show_snoovatar extends redditUserProperty('pref_show_snoovatar') {
}
exports.pref_show_snoovatar = pref_show_snoovatar;
class verified extends redditUserProperty('verified') {
}
exports.verified = verified;
//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.RedditContent<Snoowrap.RedditUser>
//----------------------------------------------------------------------------------
class created_utc extends redditUserProperty('created_utc') {
}
exports.created_utc = created_utc;
class created extends redditUserProperty('created') {
}
exports.created = created;
class id extends redditUserProperty('id') {
}
exports.id = id;
class name extends redditUserProperty('name') {
}
exports.name = name;
//----------------------------------------------------------------------------------
//  Properties made available through more complicated functions
//----------------------------------------------------------------------------------
class subredditHistory extends condition_class_1.listable {
    constructor() {
        super();
    }
    execute(args) {
        if (args.cookies["subredditHistory"] != undefined) {
            return Promise.resolve(args.cookies["subredditHistory"]);
        }
        return new Promise((resolve, reject) => {
            args.user
                .getComments()
                .then((listing) => {
                let subreddits = [];
                listing.forEach((comment) => {
                    if (!subreddits.includes(comment.subreddit.display_name.toLowerCase())) {
                        subreddits.push(comment.subreddit.display_name.toLowerCase());
                    }
                });
                args.cookies["subredditHistory"] = subreddits;
                resolve(subreddits);
            })
                .catch((error) => {
                reject(error);
            }); // May cause issues if reddit connection is interrupted?
        });
    }
}
exports.subredditHistory = subredditHistory;
