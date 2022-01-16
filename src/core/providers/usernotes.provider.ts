import * as toolbox from 'toolbox-api';
import { RedditProvider } from './reddit.provider';
import Snoowrap, { Subreddit } from 'snoowrap';
import { OrFail } from '../lib/helper.lib';

import { logging } from '../../core/logging';
import { expandPermalink, PrettyUsernote } from 'toolbox-api';

const logger = logging.getLogger('core.provider.UsernotesProvider');

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
		return new Promise<Snoowrap.WikiPage>((resolve, reject) => {
			RedditProvider.Instance.getTargetSubreddit()
				.fetch()
				.then((subreddit: Subreddit) => {
					resolve(subreddit.getWikiPage('usernotes').fetch());
				});
		});
	}

	public addUsernote(user: Snoowrap.RedditUser, note: string): void {
		this.addUsernoteByName(user.name, note);
	}

	public addUsernoteByName(user: string, note: string): void {
		logger.warn(
			'Usernotes are currently disabled due to error in underlying libraries'
		);
		return;

		void this.getUsernotesPage().then((wiki: Snoowrap.WikiPage) => {
			const usernotes = new toolbox.UsernotesData(wiki.content_md);
			usernotes.addUsernote(user, note);

			wiki.edit({
				text: JSON.stringify(usernotes),
				reason: 'toolbox modification by gort',
			});
		});
	}

	public getUsernotesByName(user: string): Promise<PrettyUsernote[]> {
		return new Promise<PrettyUsernote[]>((resolve, reject) => {
			void this.getUsernotesPage().then((wiki: Snoowrap.WikiPage) => {
				const usernotes = new toolbox.UsernotesData(wiki.content_md);

				// Find username case_insensitive
				Object.keys(usernotes.users).forEach((key) => {
					if (key.toLowerCase() == user.toLowerCase()) {
						resolve(
							usernotes.users[key].ns.map<PrettyUsernote>(
								(note) => {
									return <PrettyUsernote>{
										text: note.n,
										timestamp: note.t
											? new Date(note.t * 1000)
											: undefined,
										link: note.l && expandPermalink(note.l),
									};
								}
							)
						);
					}
				});

				resolve([]);
			});
		});
	}
}
