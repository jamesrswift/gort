import Snoowrap from 'snoowrap';
import { executable, executableArguments, listable } from '../condition.class';

function redditUserProperty<K extends keyof Snoowrap.RedditUser>(
	propertyName: K
) {
	return class extends executable<Snoowrap.RedditUser[K]> {
		constructor() {
			super();
		}
		public override execute(
			args: executableArguments
		): Promise<Snoowrap.RedditUser[K]> {
			// @ts-ignore because we will be sensible.
			return Promise.resolve(args.user[propertyName]);
		}
	};
}

//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.RedditUser
//----------------------------------------------------------------------------------

export class comment_karma extends redditUserProperty('comment_karma') {}
export class has_mod_mail extends redditUserProperty('has_mod_mail') {}
export class has_subscribed extends redditUserProperty('has_subscribed') {}
export class has_verified_mail extends redditUserProperty(
	'has_verified_mail'
) {}
export class hide_from_robots extends redditUserProperty('hide_from_robots') {}
export class is_employee extends redditUserProperty('is_employee') {}
export class is_gold extends redditUserProperty('is_gold') {}
export class is_mod extends redditUserProperty('is_mod') {}
export class link_karma extends redditUserProperty('link_karma') {}
export class pref_show_snoovatar extends redditUserProperty(
	'pref_show_snoovatar'
) {}
export class verified extends redditUserProperty('verified') {}

//----------------------------------------------------------------------------------
//  Properties made available through Snoowrap.RedditContent<Snoowrap.RedditUser>
//----------------------------------------------------------------------------------

export class created_utc extends redditUserProperty('created_utc') {}
export class created extends redditUserProperty('created') {}
export class id extends redditUserProperty('id') {}
export class name extends redditUserProperty('name') {}

//----------------------------------------------------------------------------------
//  Properties made available through more complicated functions
//----------------------------------------------------------------------------------

export class subredditHistory extends listable {
	constructor() {
		super();
	}

	public override execute(args: executableArguments): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			args.user
				.getComments()
				.then((listing: Snoowrap.Listing<Snoowrap.Comment>) => {
					let subreddits: string[] = [];
					listing.forEach((comment) => {
						if (
							!subreddits.includes(
								comment.subreddit.display_name.toLowerCase()
							)
						) {
							subreddits.push(
								comment.subreddit.display_name.toLowerCase()
							);
						}
					});
					resolve(subreddits);
				})
				.catch((error) => {
					reject(error);
				}); // May cause issues if reddit connection is interrupted?
		});
	}
}
