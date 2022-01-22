import actionClass from '../core/action.class';
import { notify } from '../core/actions';
import { conditional } from '../core/condition.class';
import { toxitityTrigger } from '../core/conditionals/toxicity';
import ruleBase, { targetType } from '../core/rule.class';

export class toxicityRule extends ruleBase {
	name: string = 'toxicity';
	targetType: targetType = 'Both';

	Condition: conditional = new toxitityTrigger({});

	Action: actionClass = new notify({
		message:
			'Comment/Submission triggered Perspective NLP for either SPAM or TOXICITY',
		color: '#b2c225',
		channelID: '934518268079788042',
	});
}

export default { rules: [new toxicityRule()] };
