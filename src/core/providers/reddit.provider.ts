import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';
import { OrFail } from '../lib/helper.lib';
import EventEmitter from 'events';
import { subredditStream } from './streamable.provider';

export class RedditProvider extends EventEmitter {
	//
	// Singleton Pattern
	//
	private constructor() {
		super();
		dotenv.config();

		this._client = new Snoowrap({
			userAgent: OrFail(process.env.REDDIT_USERAGENT),
			clientId: OrFail(process.env.REDDIT_CLIENTID),
			clientSecret: OrFail(process.env.REDDIT_CLIENTSECRET),
			username: OrFail(process.env.REDDIT_USERNAME),
			password: OrFail(process.env.REDDIT_PASSWORD),
		});
	}

	private static _instance?: RedditProvider;
	public static get Instance(): RedditProvider {
		return this._instance || (this._instance = new RedditProvider());
	}

	//
	//  Reddit and subreddits
	//

	private _client: Snoowrap;
	public getRedditClient(): Snoowrap {
		return this._client;
	}

	/* istanbul ignore next */
	public getTargetSubreddit() {
		return this._client.getSubreddit(OrFail(process.env.REDDIT_SUBREDDIT));
	}

	//
	// Manage Polling
	//

	/* istanbul ignore next */
	public createListeners(
		subreddit: string = OrFail(process.env.REDDIT_SUBREDDIT)
	): subredditStream {
		return new subredditStream(this, subreddit);
	}

	//
	// Utility due to issues with underlying snoowrap library
	//	see: https://github.com/not-an-aardvark/snoowrap/issues/351
	// 	see: https://github.com/not-an-aardvark/snoowrap/issues/352
	public async editWikiPage(args: editWikiPageInterface): Promise<void> {
		// Update wiki object, typing disabled due to issues
		// @ts-ignore
		args.page.subreddit = args.subreddit;
		// @ts-ignore
		args.page.title = args.page_title;

		// Get most recent revision to remove EDIT_CONFLICT error
		const revisions = await args.page.getRevisions();

		// Update wiki object, typing disabled due to issues
		// @ts-ignore
		args.page.previousRevision = revisions[0].id;

		args.page.edit({
			text: args.text,
			reason: args.reason,
			// @ts-ignore https://github.com/not-an-aardvark/snoowrap/issues/352
			previousRevision: args.page.previousRevision,
		});
	}
}

export interface editWikiPageInterface {
	subreddit: Snoowrap.Subreddit;
	page: Snoowrap.WikiPage;
	page_title: string;
	text: string;
	reason?: string;
}
