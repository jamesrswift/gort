"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.id = exports.created = exports.created_utc = void 0;
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
//  Properties made available through Snoowrap.RedditContent<Snoowrap.Submission>
//----------------------------------------------------------------------------------
class created_utc extends redditVoteableProperties('created_utc') {
}
exports.created_utc = created_utc;
class created extends redditVoteableProperties('created') {
}
exports.created = created;
class id extends redditVoteableProperties('id') {
}
exports.id = id;
class name extends redditVoteableProperties('name') {
}
exports.name = name;
