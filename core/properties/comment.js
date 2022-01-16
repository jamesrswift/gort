"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spam = exports.score_hidden = exports.removed = exports.parent_id = exports.link_id = exports.is_submitter = exports.ignore_reports = exports.depth = exports.controversiality = exports.collapsed = exports.body = exports.body_html = exports.approved = void 0;
const snoowrap_1 = __importDefault(require("snoowrap"));
const condition_class_1 = require("../condition.class");
function redditCommentProperties(propertyName) {
    return class extends condition_class_1.executable {
        constructor() {
            super();
        }
        execute(args) {
            if (args.targetType != 'Comment')
                return Promise.reject();
            if (propertyName in snoowrap_1.default.Comment &&
                args.target[propertyName] !== undefined) {
                // @ts-ignore because we will be sensible.
                return Promise.resolve(args.target[propertyName]);
            }
            // @ts-ignore because we will be sensible.
            return Promise.reject();
        }
    };
}
//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.Comment
//----------------------------------------------------------------------------------
class approved extends redditCommentProperties('approved') {
}
exports.approved = approved;
class body_html extends redditCommentProperties('body_html') {
}
exports.body_html = body_html;
class body extends redditCommentProperties('body') {
}
exports.body = body;
class collapsed extends redditCommentProperties('collapsed') {
}
exports.collapsed = collapsed;
class controversiality extends redditCommentProperties('controversiality') {
}
exports.controversiality = controversiality;
class depth extends redditCommentProperties('depth') {
}
exports.depth = depth;
class ignore_reports extends redditCommentProperties('ignore_reports') {
}
exports.ignore_reports = ignore_reports;
class is_submitter extends redditCommentProperties('is_submitter') {
} // Is OP
exports.is_submitter = is_submitter;
class link_id extends redditCommentProperties('link_id') {
}
exports.link_id = link_id;
class parent_id extends redditCommentProperties('parent_id') {
}
exports.parent_id = parent_id;
class removed extends redditCommentProperties('removed') {
}
exports.removed = removed;
class score_hidden extends redditCommentProperties('score_hidden') {
}
exports.score_hidden = score_hidden;
class spam extends redditCommentProperties('spam') {
}
exports.spam = spam;
