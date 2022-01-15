import { logging } from '../logging';
import mongoose from '../providers/database.provider';

const BrigadeEntrySchema = new mongoose.Schema(
	{
		origin: String,
		originator: String,
		target: String,
	},
	{ strict: false }
);

export const BrigadeEntry = mongoose.model('brigadeentry', BrigadeEntrySchema);

const logger = logging.getLogger('core.manager.brigadeManager');

export default class brigadeManager {
	private static _instance?: brigadeManager;
	public static get Instance(): brigadeManager {
		return this._instance || (this._instance = new brigadeManager());
	}
	private constructor() {}

	public async addBrigadeEntry(
		origin: string,
		originator: string,
		target: string
	): Promise<any> {
		// Check that it isn't already on the list somehow?

		const entry = new BrigadeEntry({
			origin: origin.toLowerCase(),
			originator: originator.toLowerCase(),
			target: target.toLowerCase(),
		});
		entry.save();
		return entry;
	}

	public async isTargetOnBrigadeList(target: string): Promise<boolean> {
		return BrigadeEntry.exists({ target: target.toLowerCase() });
	}

	public async getBrigadeEntryInfo(target: string): Promise<any> {
		return BrigadeEntry.findOne({ target: target.toLowerCase() }).exec();
	}
}
