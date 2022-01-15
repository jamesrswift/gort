import { notify } from '../core/actions';
import { arrayIncludes } from '../core/conditionals/array';
import { brigadeOrigin } from '../core/conditionals/brigaded';
import { subredditHistory } from '../core/properties/user';
import ruleBase, { targetType } from '../core/rule.class';

export class subredditHistoryRule extends ruleBase {
	name: string = 'UserSubredditHistory';
	targetType: targetType = 'Both';

	Condition = new arrayIncludes(new subredditHistory(), new brigadeOrigin());

	Action = new notify({
		color: '#db3838',
		message: 'User contributed to "bad" subreddits',
		channelID: '931921060826349578',
	});
}

export default { rules: [new subredditHistoryRule()] };
