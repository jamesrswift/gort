import Snoowrap from 'snoowrap';
import Pollify from './pollify.lib';

/* istanbul ignore next */
function isSnoowrap(obj: any): boolean {
	return (
		typeof obj.getNew == 'function' &&
		typeof obj.getNewComments == 'function'
	);
}

export type tPollFn = (...args: any[]) => Promise<any>;

export interface IPostStreamOptions {
	rate?: number;
	regex?: RegExp;
}

export interface IPostStreamCacheObject {
	cache: any[];
}

/* istanbul ignore next */
export default class SnooStream {
	snoowrap: Snoowrap;
	startTime: number;
	drift: number;

	constructor(
		options: Snoowrap | Snoowrap.SnoowrapOptions,
		drift: number = 0
	) {
		this.snoowrap = isSnoowrap(options)
			? (options as Snoowrap)
			: new Snoowrap(options as Snoowrap.SnoowrapOptions);
		this.startTime = Math.floor(Date.now() / 1000);
		this.drift = drift;
	}

	postStream(
		pollFn: tPollFn,
		subreddit: string = 'all',
		opts: IPostStreamOptions = {}
	): Pollify {
		const cacheObj: IPostStreamCacheObject = { cache: [] };
		const poll = new Pollify(
			{
				rate: opts.rate || 1000,
				mode: 'promise',
			},
			pollFn,
			subreddit,
			opts
		);

		poll.on('data', (data) => {
			data = this.dedupe(data, cacheObj);
			data.filter(
				(post: Snoowrap.Comment | Snoowrap.Submission) =>
					post.created_utc >= this.startTime - this.drift
			)
				//.forEach( (post: Snoowrap.Comment | Snoowrap.Submission) => this.parse(post, poll, opts.regex))
				.forEach((post: Snoowrap.Comment | Snoowrap.Submission) =>
					poll.emit('post', post)
				);
		});

		return poll;
	}

	private dedupe(batch: any[], cacheObj: IPostStreamCacheObject): any[] {
		const diff = batch.filter((entry: any) =>
			cacheObj.cache.every((oldEntry) => entry.id !== oldEntry.id)
		);
		cacheObj.cache = batch;
		return diff;
	}

	/*private parse(data : Snoowrap.Comment | Snoowrap.Submission, emitter: Pollify, regex: RegExp){
        const match = data.body.match(regex);
        if ( match ){
            emitter.emit('post', data, match)
        }
    }*/

	commentStream(subreddit?: string, opts?: IPostStreamOptions): Pollify {
		const pollFn = this.snoowrap.getNewComments.bind(this.snoowrap);
		return this.postStream(pollFn, subreddit, opts);
	}

	submissionStream(subreddit?: string, opts?: IPostStreamOptions): Pollify {
		const pollFn = this.snoowrap.getNew.bind(this.snoowrap);
		return this.postStream(pollFn, subreddit, opts);
	}

	modqueueStream(subreddit: string, opts?: IPostStreamOptions): Pollify {
		const sub = this.snoowrap.getSubreddit(subreddit);
		const pollFn = sub.getModqueue.bind(sub);
		return this.postStream(pollFn);
	}
}
