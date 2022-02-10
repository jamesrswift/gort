import action from '../core/action.class';
import { notify } from '../core/actions';
import { conditional, executableArguments } from '../core/condition.class';
import { subredditHistory } from '../core/properties/user';
import ruleBase, { targetType } from '../core/rule.class';

export class subredditHistoryRule extends ruleBase {
	name: string = 'UserSubredditHistory';
	targetType: targetType = 'Both';

	badSubreddits: string[] = [
		'lockdownskepticism',
		'lockdowncriticalleft',
		'coronaviruscirclejerk',
		'ukantilockdown',
		'ivermectin',
		'nolockdownsnomasks',
		'greenandpleasant',
		'greenandextreme',
		'latestagecapitalism',
		'communism',
		'genzedong',
		'badunitedkingdom',
		'newcoronavirusuk',
		'coronavirusuk2',
		'coronavirusukarchive',
		'lockdownsceptics',
		'coronavirusfos',
		'debatevaccines',
		'churchofcovid',
		'covidrebellionuk',
		'joerogan',
		'awakenedtothetruth',
		'vaccinelonghauler',
		'wuhan_flu',
		'srne',
		'2007scape',
	];

	Condition: conditional = new (class extends conditional {
		badSubreddits: string[] = [];
		public constructor(badSubreddits: string[]) {
			super();
			this.badSubreddits = badSubreddits;
		}
		public override async execute(
			args: executableArguments
		): Promise<boolean> {
			// Get subreddit history
			const history: string[] = await new subredditHistory().execute(
				args
			);

			// Condition
			const arrayIntersection = this.badSubreddits.filter((value) =>
				history.includes(value)
			);
			const condition: boolean = arrayIntersection.length > 0;

			// Set cookie
			args.cookies['BadSubreddits'] = arrayIntersection ?? [];

			return condition;
		}
	})(this.badSubreddits);

	Action: action = new (class subredditHistoryNotification extends notify {
		public override async buildReasonField(args: executableArguments) {
			return `User contributed to the following subreddits: ${args.cookies[
				'BadSubreddits'
			]?.join(', ')}`;
		}
	})({
		color: '#db3838',
		channelID: '934518094804705370',
	});
}

export default { rules: [new subredditHistoryRule()] };
