import Discord, { ColorResolvable, Message } from 'discord.js';
import Snoowrap from 'snoowrap';
import action from '../action.class';
import { executableArguments } from '../condition.class';
import { MessageEmbed_NoThrow, OrDefault, textEllipsis } from '../lib/helper.lib';
import { logging } from '../logging';
import { DiscordProvider } from '../providers/discord.provider';

const logger = logging.getLogger('core.action.notify');

interface notifyActionOptions {
	message?: string;
	color?: ColorResolvable;
	description?: string;
	channelID?: string;
}

/**
 * Discord Notification Action
 *
 * @category Actions
 */
export default class notifyAction extends action {
	public _sOpts: notifyActionOptions;

	constructor(options: notifyActionOptions) {
		super();
		this._sOpts = options;
	}

	public async buildEmbed(
		args: executableArguments,
		embed: Discord.MessageEmbed
	) {
		MessageEmbed_NoThrow(embed, 'Account Age (days)',
			Math.ceil(
				(Date.now() / 1000 - args.user.created) / (60 * 60 * 24)
			).toString(),
			true );

		MessageEmbed_NoThrow(embed,'Link Karma', args.user.link_karma.toString(), true);
		MessageEmbed_NoThrow(embed, 'Comment Karma',
			args.user.comment_karma.toString(),
			true );
	}

	public async buildReasonField(
		args: executableArguments,
		embed: Discord.MessageEmbed
	) {
		return this._sOpts.message ?? 'UNDEFINED';
	}

	public override async execute(args: executableArguments) {
		const embed = new Discord.MessageEmbed()
			.setTitle('Gort Notification')
			.setURL('http://reddit.com' + args.target.permalink + '?context=2')
			.setDescription(
				OrDefault(
					this._sOpts.description,
					`A user has commented on r/${process.env.REDDIT_SUBREDDIT} and has triggered this warning!`
				)
			)
			.setTimestamp();

			MessageEmbed_NoThrow( embed,'username', args.user.name)
			MessageEmbed_NoThrow( embed,'Content Body',
				textEllipsis(
					(<Snoowrap.Comment>args.target).body ||
						(<Snoowrap.Submission>args.target).selftext,
					500
				)
			)

		await this.buildEmbed(args, embed);

		MessageEmbed_NoThrow( embed, 'Trigger Reason', (await this.buildReasonField(args, embed)) ?? 'UNDEFINED')
		embed.setFooter({ text: 'Provided by CensorshipCo' });
		embed.setColor(this._sOpts.color ?? '#0099ff');

		DiscordProvider.Instance.sendMessage(
			{ embeds: [embed] },
			this._sOpts.channelID
		);
		logger.info(`Executing notify action on ${args.target.id}`);
	}
}
