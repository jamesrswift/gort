import * as toolbox from 'toolbox-api';
import { RedditProvider } from './reddit.provider';
import Snoowrap, { Subreddit } from 'snoowrap';
import { OrFail } from '../lib/helper.lib';

export default class UsernotesProvider {
	//
	// Singleton Pattern
	//
	private static _instance?: UsernotesProvider;
	public static get Instance(): UsernotesProvider {
		return this._instance || (this._instance = new UsernotesProvider());
	}

	private constructor() {}

	public getUsernotesPage(): Promise<Snoowrap.WikiPage> {
		return new Promise<Snoowrap.WikiPage>( (resolve, reject) =>{
			console.log( RedditProvider.Instance.getTargetSubreddit() )
			RedditProvider.Instance.getTargetSubreddit().fetch().then( (subreddit: Subreddit) =>{
				resolve(subreddit.getWikiPage('usernotes').fetch());
			})
		})
	}

	public addUsernote(user: Snoowrap.RedditUser, note: string): void {
		this.addUsernoteByName(user.name, note);
	}

	public addUsernoteByName(user: string, note: string): void {
		void this.getUsernotesPage().then((wiki: Snoowrap.WikiPage) => {
			const usernotes = new toolbox.UsernotesData(wiki.content_md);
			usernotes.addUsernote(user, note);

			wiki.edit({
				text: JSON.stringify(usernotes),
				reason: 'toolbox modification by gort',
			});
		});
	}
}
