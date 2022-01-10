import action from '../core/action.class';
import { executableArguments } from '../core/condition.class';
import { isWatched } from '../core/conditionals/watched';
import ruleBase, { targetType } from '../core/rule.class';

class watchedAction extends action {
	public async execute(args: executableArguments) {}
}

export default class watchedRule extends ruleBase {
	name: string = 'watchedRule';
	targetType: targetType = 'Both';
	Condition = new isWatched();

	Action = new watchedAction();
}
