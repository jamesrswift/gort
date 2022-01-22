import { logging } from '../logging';
import mongoose from '../providers/database.provider';

const IgnoredUsersSchema = new mongoose.Schema(
	{
		name: String,
		actioner: String,
	},
	{ strict: false }
);

export const IgnoredUser = mongoose.model('ignoredusers', IgnoredUsersSchema);

const logger = logging.getLogger('core.manager.ignoredManager');

export default class ignoredManager {
	private static _instance?: ignoredManager;
	public static get Instance(): ignoredManager {
		return this._instance || (this._instance = new ignoredManager());
	}
	private constructor() {}

	async addIgnoredUser(name: string, actioner: string): Promise<any> {
		// TO DO: Unwatch user if necessary

		if (await this.isUserIgnored(name)) {
			logger.warn(`${name} is already ignored. No action taken`);
			return;
		}

		logger.info(
			`Adding ${name} to list of ignored users. Actioned by ${actioner}.`
		);
		const ignore = new IgnoredUser({
			name: name.toLowerCase(),
			actioner: actioner.toLowerCase(),
		});
		ignore.save();
		return ignore;
	}

	async removeIgnoredUser(name: string) {
		IgnoredUser.findOneAndDelete(
			{ name: name.toLowerCase() },
			undefined,
			(error, entry) => {
				if (error) return;
				logger.info(`Removing ${name} from list of ignored users.`);
			}
		);
	}

	async isUserIgnored(user: string): Promise<boolean> {
		try{
			return IgnoredUser.exists({ name: user.toLowerCase() });
		} catch(err: any) {
			return Promise.resolve(false)
		}
		
	}

	public async getIgnoredUserInfo(name: string): Promise<any> {
		return IgnoredUser.findOne({ name: name.toLowerCase() }).exec();
	}
}
