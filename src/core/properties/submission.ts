import Snoowrap from "snoowrap";
import { executable, conditional, countable, legible, listable } from "../condition.class";

function redditSubmissionProperties<K extends keyof Snoowrap.Submission>(propertyName: K) {
    return class extends executable<Snoowrap.Submission[K]> {
        constructor() { super() }
        public override execute(user: Snoowrap.RedditUser, target: Snoowrap.Comment | Snoowrap.Submission): Promise<Snoowrap.Submission[K]> {
            if (propertyName in Snoowrap.Submission && (<Snoowrap.Submission>target)[propertyName] !== undefined) {
                // @ts-ignore because we will be sensible.
                Promise.resolve((<Snoowrap.Submission>target)[propertyName])
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

//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.VoteableContent<Snoowrap.Submission>
//----------------------------------------------------------------------------------

export class archived extends redditSubmissionProperties('archived') { };
export class author_fullname extends redditSubmissionProperties('author_fullname') { };
export class author_patreon_flair extends redditSubmissionProperties('author_patreon_flair') { };
export class can_gild extends redditSubmissionProperties('can_gild') { };
export class can_mod_post extends redditSubmissionProperties('can_mod_post') { };
export class downs extends redditSubmissionProperties('downs') { };
export class gilded extends redditSubmissionProperties('gilded') { };
export class mod_note extends redditSubmissionProperties('mod_note') { };
export class mod_reason_by extends redditSubmissionProperties('mod_reason_by') { };
export class mod_reason_title extends redditSubmissionProperties('mod_reason_title') { };
export class no_follow extends redditSubmissionProperties('no_follow') { };
export class num_reports extends redditSubmissionProperties('num_reports') { };
export class permalink extends redditSubmissionProperties('permalink') { };
export class saved extends redditSubmissionProperties('saved') { };
export class score extends redditSubmissionProperties('score') { };
export class send_replies extends redditSubmissionProperties('send_replies') { };
export class stickied extends redditSubmissionProperties('stickied') { };
export class subreddit_id extends redditSubmissionProperties('subreddit_id') { };
export class subreddit_name_prefixed extends redditSubmissionProperties('subreddit_name_prefixed') { };
export class ups extends redditSubmissionProperties('ups') { };

//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.RedditContent<Snoowrap.Submission>
//----------------------------------------------------------------------------------

export class created_utc extends redditSubmissionProperties('created_utc') { };
export class created extends redditSubmissionProperties('created') { };
export class id extends redditSubmissionProperties('id') { };
export class name extends redditSubmissionProperties('name') { };