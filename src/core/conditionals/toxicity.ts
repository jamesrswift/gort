import Snoowrap, { Comment } from 'snoowrap';
import { executable, executableArguments } from '../condition.class';
import {
	Client,
	IAttributeScores,
	IClientOptions,
} from '@conversationai/perspectiveapi-js-client';

export class toxitityTrigger extends executable<boolean> {
	private _APIKey: string = '';
	private _client: Client;
	private _options: IClientOptions;
	public constructor(options: IClientOptions) {
		super();
		this._client = new Client(this._APIKey);
		this._options = options;
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
					return value['SPAM'] > 0.95 || value['TOXICITY'] > 0.95;
				});
		});
	}
}
