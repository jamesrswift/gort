import Discord from 'discord.js';
import Snoowrap from 'snoowrap';
import commandBase from '../core/command.class';
import { logging } from '../core/logging';
import { RedditProvider } from '../core/providers/reddit.provider';

const logger = logging.getLogger('core.commands.votedump');

class votedumpCommand extends commandBase {
	name = 'votedump';
	description = 'send a copy of the current votes for a given thread';
	usage = 'votedump <threadid>';

	override async execute(
		args: string[],
		cmd: string,
		discordMessage: Discord.Message
	): Promise<string | undefined | null> {
		const threadID = args.shift();

		// Validate usage
		if (threadID == undefined) {
			logger.warn(
				`Malformed command, no action taken! Correct usage: ${this.usage}`
			);
			return `Malformed command, no action taken! Correct usage: ${this.usage}`;
		}

		discordMessage.reply({
			files: [await this.createAttachment(threadID)],
		});

		return undefined;
	}

	private async traverseReplies(
		votes: Map<string, number>,
		comments: Snoowrap.Listing<Snoowrap.Comment>
	): Promise<void> {
		comments.forEach((comment: Snoowrap.Comment) => {
			votes.set(comment.id, comment.ups - comment.downs);
			this.traverseReplies(votes, comment.replies);
		});
		return void 0;
	}

	private async createAttachment(
		threadID: string
	): Promise<Discord.MessageAttachment> {
		return new Promise<Discord.MessageAttachment>(
			async (resolve, reject) => {
				RedditProvider.Instance.getRedditClient()
					.getSubmission(threadID)
					.expandReplies()
					.then(async (submission) => {
						const votes: Map<string, number> = new Map<
							string,
							number
						>();
						await this.traverseReplies(votes, submission.comments);

						resolve(
							new Discord.MessageAttachment(
								Buffer.from(
									JSON.stringify(
										Object.fromEntries(votes),
										null,
										4
									)
								),
								`votes_${threadID}_${new Date().toUTCString()}.txt`
							)
						);
					});
			}
		);
	}
}

export default {
	commands: [new votedumpCommand()],
};
