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
		if ( value['TOXICITY'] > 0.95 ) return true
		if ( value['SEVERE_TOXICITY'] > 0.95 ) return true
		if ( value['IDENTITY_ATTACK'] > 0.95 ) return true
		if ( value['INSULT'] > 0.95 ) return true
		if ( value['PROFANITY'] > 0.95 ) return true
		if ( value['THREAT'] > 0.95 ) return true

		// Experimental values:
		if ( value['SEXUALLY_EXPLICIT'] > 0.95 ) return true
		if ( value['FLIRTATION'] > 0.95 ) return true

		// New York Times attributes
		if ( value['ATTACK_ON_AUTHOR'] > 0.95 ) return true
		if ( value['ATTACK_ON_COMMENTER'] > 0.95 ) return true
		if ( value['INCOHERENT'] > 0.95 ) return true
		if ( value['INFLAMMATORY'] > 0.95 ) return true
		if ( value['LIKELY_TO_REJECT'] > 0.95 ) return true
		if ( value['OBSCENE'] > 0.95 ) return true
		if ( value['SPAM'] > 0.95 ) return true
		//if ( value['UNSUBSTANTIAL'] > 0.95 ) return true

		return false
	}

	public override async execute(args: executableArguments): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			const html =
				args.targetType == 'Comment'
					? (<Snoowrap.Comment>args.target).body_html
					: (<Snoowrap.Submission>args.target).selftext_html;
			if (html == null) return resolve(false);

			this._client
				.getScores(html, this._options)
				.then((value: IAttributeScores) => {
					resolve(this.scoresDecision(value))
				});
		});
	}
}
