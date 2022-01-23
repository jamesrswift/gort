import { MessageEmbed } from 'discord.js';
import notifyAction from '../core/actions/notify';
import { executableArguments } from '../core/condition.class';
import { isWatched } from '../core/conditionals/watched';
import { OrDefault_NonEmptyString } from '../core/lib/helper.lib';
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
		embed.addField('Actioner', OrDefault_NonEmptyString(info.actioner,"UNDEFINED") )
		embed.addField('Message', OrDefault_NonEmptyString(info.message,"UNDEFINED"));
	}
}

export class watchedRule extends ruleBase {
	name: string = 'watchedRule';
	targetType: targetType = 'Both';
	Condition = new isWatched();

	Action = new watchedAction({
		message: 'User is on watch list',
		//color?: string;
		description:
			`A watched user has commented on r/${process.env.REDDIT_SUBREDDIT} and has triggered this warning!`,
		channelID: '934518400221319248',
	});
}

export default { rules: [new watchedRule()] };
