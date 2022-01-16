import * as toolbox from 'toolbox-api';
import { RedditProvider } from './reddit.provider';
import Snoowrap, { Subreddit } from 'snoowrap';
import { logging } from '../../core/logging';

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
		//return;

		void this.getUsernotesPage().then((wiki: Snoowrap.WikiPage) => {
			const usernotes = new toolbox.UsernotesData(wiki.content_md);
			usernotes.addUsernote(user, note);

			const subreddit = RedditProvider.Instance.getTargetSubreddit().fetch().then( (subreddit: Snoowrap.Subreddit) => {
				// @ts-ignore
				wiki.subreddit = subreddit;
				// @ts-ignore
				wiki.title = 'usernotes';

				wiki.getRevisions().then(rev => {
					try {
						// @ts-ignore
						wiki.previousRevision = (rev[0]).id
						console.log( `previous revision = ${(rev[0]).id}`)
						wiki.edit({
							text: JSON.stringify(usernotes),
							reason: 'toolbox modification by gort',

							// @ts-ignore
							previousRevision: (rev[0]).id
						});
					} catch ( error: any ) {
						console.log(error)
					}
					
				})
				
			})
			
		});
	}

	public getUsernotesByName(user: string): Promise<toolbox.PrettyUsernote[]> {
		return new Promise<toolbox.PrettyUsernote[]>((resolve, reject) => {
			void this.getUsernotesPage().then((wiki: Snoowrap.WikiPage) => {
				const usernotes = new toolbox.UsernotesData(wiki.content_md);

				// Find username case_insensitive
				Object.keys(usernotes.users).forEach((key) => {
					if (key.toLowerCase() == user.toLowerCase()) {
						resolve(
							usernotes.users[key].ns.map<toolbox.PrettyUsernote>(
								(note) => {
									return <toolbox.PrettyUsernote>{
										text: note.n,
										timestamp: note.t
											? new Date(note.t * 1000)
											: undefined,
										link: note.l && toolbox.expandPermalink(note.l),
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
