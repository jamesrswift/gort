import Snoowrap from "snoowrap";
import { executable, executableArguments } from "../condition.class";

function redditSubmissionProperties<K extends keyof Snoowrap.Submission>(propertyName: K) {
    return class extends executable<Snoowrap.Submission[K]> {
        constructor() { super() }
        public override execute(args: executableArguments): Promise<Snoowrap.Submission[K]> {
            if (args.targetType != 'submission') return Promise.reject();
            if (propertyName in Snoowrap.Submission && (<Snoowrap.Submission>args.target)[propertyName] !== undefined) {
                // @ts-ignore because we will be sensible.
                return Promise.resolve((<Snoowrap.Submission>target)[propertyName])
            }
            // @ts-ignore because we will be sensible.
            return Promise.reject()
        }
    }
}

//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.Submission
//----------------------------------------------------------------------------------

export class contest_mode extends redditSubmissionProperties('contest_mode') { };
export class domain extends redditSubmissionProperties('domain') { };
export class hidden extends redditSubmissionProperties('hidden') { };
export class hide_score extends redditSubmissionProperties('hide_score') { };
export class is_crosspostable extends redditSubmissionProperties('is_crosspostable') { };
export class is_meta extends redditSubmissionProperties('is_meta') { };
export class is_original_content extends redditSubmissionProperties('is_original_content') { };
export class is_reddit_media_domain extends redditSubmissionProperties('is_reddit_media_domain') { };
export class is_robot_indexable extends redditSubmissionProperties('is_robot_indexable') { };
export class is_self extends redditSubmissionProperties('is_self') { };
export class is_video extends redditSubmissionProperties('is_video') { };
export class locked extends redditSubmissionProperties('locked') { };
export class media_only extends redditSubmissionProperties('media_only') { };
export class num_comments extends redditSubmissionProperties('num_comments') { };
export class num_crossposts extends redditSubmissionProperties('num_crossposts') { };
export class over_18 extends redditSubmissionProperties('over_18') { };
export class parent_whitelist_status extends redditSubmissionProperties('parent_whitelist_status') { };
export class pinned extends redditSubmissionProperties('pinned') { };
export class pwls extends redditSubmissionProperties('pwls') { };
export class post_hint extends redditSubmissionProperties('post_hint') { };
export class quarantine extends redditSubmissionProperties('quarantine') { };
export class selftext extends redditSubmissionProperties('selftext') { };
export class spoiler extends redditSubmissionProperties('spoiler') { };
export class subreddit_subscribers extends redditSubmissionProperties('subreddit_subscribers') { };
export class thumbnail extends redditSubmissionProperties('thumbnail') { };
export class title extends redditSubmissionProperties('title') { };
export class upvote_ratio extends redditSubmissionProperties('upvote_ratio') { };
export class url extends redditSubmissionProperties('url') { };
export class visited extends redditSubmissionProperties('visited') { };
export class whitelist_status extends redditSubmissionProperties('whitelist_status') { };
export class wls extends redditSubmissionProperties('wls') { };
