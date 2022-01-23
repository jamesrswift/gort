import { MessageEmbed } from 'discord.js';
import actionClass from '../core/action.class';
import { notify } from '../core/actions';
import { conditional, executableArguments } from '../core/condition.class';
import { toxitityTrigger } from '../core/conditionals/toxicity';
import { OrDefault } from '../core/lib/helper.lib';
import watchedManager from '../core/managers/watched.manager';
import ruleBase, { targetType } from '../core/rule.class';

class toxicityAction extends notify {
	public override async buildEmbed(
		args: executableArguments,
		embed: MessageEmbed
	): Promise<void> {
		embed.addField('Message', args.cookies['toxicity_triggered'].join(","));
	}
}

export class toxicityRule extends ruleBase {
	name: string = 'toxicity';
	targetType: targetType = 'Both';

	Condition: conditional = new toxitityTrigger({});

	Action: actionClass = new toxicityAction({
		message:
			'Comment/Submission triggered Perspective NLP',
		color: '#b2c225',
		channelID: '934518268079788042',
	});
}

export default { rules: [new toxicityRule()] };
