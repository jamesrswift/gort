import Snoowrap from 'snoowrap';
import { executable, executableArguments } from '../condition.class';

function redditVoteableProperties<
	K extends keyof Snoowrap.VoteableContent<
		Snoowrap.Comment | Snoowrap.Submission
	>
>(propertyName: K) {
	return class extends executable<
		Snoowrap.VoteableContent<Snoowrap.Comment | Snoowrap.Submission>[K]
	> {
		constructor() {
			super();
		}
		public override execute(
			args: executableArguments
		): Promise<
			Snoowrap.VoteableContent<Snoowrap.Comment | Snoowrap.Submission>[K]
		> {
			return Promise.resolve(
				(<
					Snoowrap.VoteableContent<
						Snoowrap.Comment | Snoowrap.Submission
					>
				>args.target)[propertyName]
			);
		}
	};
}

//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.VoteableContent<Snoowrap.Submission>
//----------------------------------------------------------------------------------

export class archived extends redditVoteableProperties('archived') {}
export class author_fullname extends redditVoteableProperties(
	'author_fullname'
) {}
export class author_patreon_flair extends redditVoteableProperties(
	'author_patreon_flair'
) {}
export class can_gild extends redditVoteableProperties('can_gild') {}
export class can_mod_post extends redditVoteableProperties('can_mod_post') {}
export class downs extends redditVoteableProperties('downs') {}
export class gilded extends redditVoteableProperties('gilded') {}
export class mod_note extends redditVoteableProperties('mod_note') {}
export class mod_reason_by extends redditVoteableProperties('mod_reason_by') {}
export class mod_reason_title extends redditVoteableProperties(
	'mod_reason_title'
) {}
export class no_follow extends redditVoteableProperties('no_follow') {}
export class num_reports extends redditVoteableProperties('num_reports') {}
export class permalink extends redditVoteableProperties('permalink') {}
export class saved extends redditVoteableProperties('saved') {}
export class score extends redditVoteableProperties('score') {}
export class send_replies extends redditVoteableProperties('send_replies') {}
export class stickied extends redditVoteableProperties('stickied') {}
export class subreddit_id extends redditVoteableProperties('subreddit_id') {}
export class subreddit_name_prefixed extends redditVoteableProperties(
	'subreddit_name_prefixed'
) {}
export class ups extends redditVoteableProperties('ups') {}
