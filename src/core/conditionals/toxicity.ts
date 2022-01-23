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

	public scoresDecision(value: IAttributeScores){
		if ( value['TOXICITY'] > 0.95 ) return true // A rude, disrespectful, or unreasonable comment that is likely to make people leave a discussion.
		if ( value['SEVERE_TOXICITY'] > 0.95 ) return true // A very hateful, aggressive, disrespectful comment or otherwise very likely to make a user leave a discussion or give up on sharing their perspective. This attribute is much less sensitive to more mild forms of toxicity, such as comments that include positive uses of curse words.
		if ( value['IDENTITY_ATTACK'] > 0.95 ) return true // Negative or hateful comments targeting someone because of their identity.
		if ( value['INSULT'] > 0.95 ) return true // Insulting, inflammatory, or negative comment towards a person or a group of people.
		if ( value['PROFANITY'] > 0.95 ) return true // Swear words, curse words, or other obscene or profane language.
		if ( value['THREAT'] > 0.95 ) return true // Describes an intention to inflict pain, injury, or violence against an individual or group.

		// Experimental values:
		if ( value['SEXUALLY_EXPLICIT'] > 0.95 ) return true // Contains references to sexual acts, body parts, or other lewd content.
		if ( value['FLIRTATION'] > 0.95 ) return true // Pickup lines, complimenting appearance, subtle sexual innuendos, etc.

		// New York Times attributes
		if ( value['ATTACK_ON_AUTHOR'] > 0.95 ) return true // Attack on the author of an article or post. 
		if ( value['ATTACK_ON_COMMENTER'] > 0.95 ) return true // Attack on fellow commenter.
		if ( value['INCOHERENT'] > 0.95 ) return true // Difficult to understand, nonsensical.
		if ( value['INFLAMMATORY'] > 0.95 ) return true // Intending to provoke or inflame.
		if ( value['LIKELY_TO_REJECT'] > 0.95 ) return true // Overall measure of the likelihood for the comment to be rejected according to the NYT's moderation.
		if ( value['OBSCENE'] > 0.95 ) return true // Obscene or vulgar language such as cursing.
		if ( value['SPAM'] > 0.95 ) return true // Irrelevant and unsolicited commercial content.
		//if ( value['UNSUBSTANTIAL'] > 0.95 ) return true // Trivial or short comments

		return false
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
					resolve(this.scoresDecision(value))
				});
		});
	}
}
