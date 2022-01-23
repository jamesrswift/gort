import {
	Client,
	IAttributeScores,
	IClientOptions,
} from '@conversationai/perspectiveapi-js-client';
import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';
import { executable, executableArguments } from '../condition.class';
import { OrFail } from '../lib/helper.lib';

export class toxitityTrigger extends executable<boolean> {
	private _APIKey: string = '';
	private _client: Client;
	private _options: IClientOptions;
	public constructor(options: IClientOptions) {
		super();

		dotenv.config();
		(this._APIKey = OrFail(process.env.PERSPECTIVE_API)),
			(this._client = new Client(this._APIKey));
		this._options = options;
	}

	private thresholds : Map<string, number> = new Map<string,number>([
		['TOXICITY', 0.95], // A rude, disrespectful, or unreasonable comment that is likely to make people leave a discussion.
		['SEVERE_TOXICITY', 0.95], // A very hateful, aggressive, disrespectful comment or otherwise very likely to make a user leave a discussion or give up on sharing their perspective. This attribute is much less sensitive to more mild forms of toxicity, such as comments that include positive uses of curse words.
		['IDENTITY_ATTACK', 0.95],// Negative or hateful comments targeting someone because of their identity.
		['INSULT', 0.95], // Insulting, inflammatory, or negative comment towards a person or a group of people.
		['PROFANITY', 0.95], // Swear words, curse words, or other obscene or profane language.
		['THREAT', 0.95], // Describes an intention to inflict pain, injury, or violence against an individual or group.

		// Experimental values:
		['SEXUALLY_EXPLICIT', 0.95], // Contains references to sexual acts, body parts, or other lewd content.
		['FLIRTATION', 0.95], // Pickup lines, complimenting appearance, subtle sexual innuendos, etc.

		// New York Times attributes:
		['ATTACK_ON_AUTHOR', 0.95], // Attack on the author of an article or post.
		['ATTACK_ON_COMMENTER', 0.95], // Attack on fellow commenter.
		['INCOHERENT', 0.95], // Difficult to understand, nonsensical.
		['INFLAMMATORY', 0.95], // Intending to provoke or inflame.
		['LIKELY_TO_REJECT', 0.95], // Overall measure of the likelihood for the comment to be rejected according to the NYT's moderation.
		['OBSCENE', 0.95], // Obscene or vulgar language such as cursing.
		['SPAM', 0.95], // Irrelevant and unsolicited commercial content.

		// Disabled
		['UNSUBSTANTIAL', 2], // Trivial or short comments
	])

	public scoresDecision(args: executableArguments, value: IAttributeScores) : boolean{

		const triggered : string[] = [];
		for ( const [key, threshold] of this.thresholds ){
			if ( value[key] == undefined || value[key] == null) continue;
			if ( value[key] >= threshold ){
				triggered.push(key)
			}
		}
		args.cookies['toxicity_triggered'] = triggered ?? [];
		return args.cookies['toxicity_triggered'].length > 0;
	}

	public override async execute(args: executableArguments): Promise<boolean> {

		const content = args.targetType == 'Comment'
		? (<Snoowrap.Comment>args.target).body
		: (<Snoowrap.Submission>args.target).selftext;

		if ( content == null ) return Promise.resolve(false);
		if ( content.length == 0 ) return Promise.resolve(false);

		return new Promise<boolean>((resolve, reject) => {
			this._client
				.getScores(content.substring(0,2900), this._options)
				.then((value: IAttributeScores) => {
					resolve(this.scoresDecision(args, value))
				});
		});
	}
}
