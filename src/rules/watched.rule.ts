import { MessageEmbed } from 'discord.js';
import notifyAction from '../core/actions/notify';
import { executableArguments } from '../core/condition.class';
import { isWatched } from '../core/conditionals/watched';
import watchedManager from '../core/managers/watched.manager';
import ruleBase, { targetType } from '../core/rule.class';

class watchedAction extends notifyAction {
	public override async buildEmbed(
		args: executableArguments,
		embed: MessageEmbed
	): Promise<void> {
		const info = await watchedManager.Instance.getWatchedUserInfo(
			args.user.name.toLowerCase()
		);
		embed.addField('Actioner', info.actioner);
		embed.addField('Message', info.message);
	}
}

export class watchedRule extends ruleBase {
	name: string = 'watchedRule';
	targetType: targetType = 'Both';
	Condition = new isWatched();

	Action = new watchedAction({
		message: '',
		//color?: string;
		description:
			'A watched user has commented on r/CoronavirusUK and has triggered this warning!',
		//channelID?: string;
	});
}

export default { rules: [new watchedRule()] };
