import { logging } from '../logging';
import mongoose from '../providers/database.provider';

const WatchedUsersSchema = new mongoose.Schema(
	{
		name: String,
		actioner: String,
		message: String,
	},
	{ strict: false }
);

export const WatchedUser = mongoose.model('watchedusers', WatchedUsersSchema);

const logger = logging.getLogger('core.manager.watchedManager');

export default class watchedManager {
	private static _instance?: watchedManager;
	public static get Instance(): watchedManager {
		return this._instance || (this._instance = new watchedManager());
	}
	private constructor() {}

	public async addWatchedUser(
		name: string,
		actioner: string,
		message: string
	): Promise<any> {
		if (await this.isUserWatched(name)) {
			return;
		}

		const watch = new WatchedUser({
			name: name.toLowerCase(),
			actioner: actioner.toLowerCase(),
			message: message,
		});
		watch.save();
		return watch;
	}

	public async removeWatchedUser(name: string) {
		WatchedUser.findOneAndDelete(
			{ name: name.toLowerCase() },
			undefined,
			(error, entry) => {
				if (error) return;
				logger.info(`Removing ${name} from list of watched users.`);
			}
		);
	}

	public async isUserWatched(user: string): Promise<boolean> {
		return (await WatchedUser.exists({ name: user.toLowerCase() }).exec()) != null;
	}

	public async getWatchedUserInfo(name: string): Promise<any> {
		return WatchedUser.findOne({ name: name.toLowerCase() }).exec();
	}
}
