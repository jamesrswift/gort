import Snoowrap from "snoowrap";
import { executable, conditional, countable, legible, listable, executableArguments } from "../condition.class";

function redditCommentProperties<K extends keyof Snoowrap.Comment>(propertyName: K) {
    return class extends executable<Snoowrap.Comment[K]> {
        constructor() { super() }
        public override execute(args: executableArguments): Promise<Snoowrap.Comment[K]> {
            if (args.targetType != 'Comment') return Promise.reject();
            if (propertyName in Snoowrap.Comment && (<Snoowrap.Comment>args.target)[propertyName] !== undefined) {
                // @ts-ignore because we will be sensible.
                return Promise.resolve((<Snoowrap.Comment>target)[propertyName])
            }
            // @ts-ignore because we will be sensible.
            return Promise.reject()
        }
    }
}

//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.Comment
//----------------------------------------------------------------------------------

export class approved extends redditCommentProperties('approved') { };
export class body_html extends redditCommentProperties('body_html') { };
export class body extends redditCommentProperties('body') { };
export class collapsed extends redditCommentProperties('collapsed') { };
export class controversiality extends redditCommentProperties('controversiality') { };
export class depth extends redditCommentProperties('depth') { };
export class ignore_reports extends redditCommentProperties('ignore_reports') { };
export class is_submitter extends redditCommentProperties('is_submitter') { }; // Is OP
export class link_id extends redditCommentProperties('link_id') { };
export class parent_id extends redditCommentProperties('parent_id') { };
export class removed extends redditCommentProperties('removed') { };
export class score_hidden extends redditCommentProperties('score_hidden') { };
export class spam extends redditCommentProperties('spam') { };
