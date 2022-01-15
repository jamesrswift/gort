import { notify } from '../core/actions';
import { arrayIncludes } from '../core/conditionals/array';
import { brigadeOrigin } from '../core/conditionals/brigaded';
import { subredditHistory } from '../core/properties/user';
import ruleBase, { targetType } from '../core/rule.class';

export class brigadeRule extends ruleBase {
	name: string = 'brigadeRule';
	targetType: targetType = 'Both';

	Condition = new arrayIncludes(new subredditHistory(), new brigadeOrigin());

	Action = new notify({
		color: '#db3838',
		message: 'This user is potentially brigading! They have a history in a subreddit that has linked to the thread they are now commenting on!',
		channelID: '931921060826349578',
	});
}

export default { rules: [new brigadeRule()] };
