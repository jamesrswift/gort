import { logging } from '../logging';
import mongoose from '../providers/database.provider'

const IgnoredUsersSchema = new mongoose.Schema(
    {
        name: String,
        actioner: String
    },
    { strict: false }
)

export const IgnoredUser = mongoose.model("ignoredusers", IgnoredUsersSchema)

const logger = logging.getLogger('core.manager.ignoredManager');

export default class ignoredManager {
    private static _instance?: ignoredManager;
    public static get Instance(): ignoredManager { return this._instance || (this._instance = new ignoredManager()); }
    private constructor() { }

    addIgnoredUser(name: string, actioner: string): any {

        // TO DO: Check if user is already ignored?
        // TO DO: Unwatch user if necessary

        logger.info(`Adding ${name} to list of ignored users. Actioned by ${actioner}.`)
        const ignore = new IgnoredUser({ name: name.toLowerCase(), actioner: actioner.toLowerCase() })
        ignore.save();
        return ignore
    }

    removeIgnoredUser(name: string): void {
        logger.info(`Removing ${name} from list of ignored users.`);
        IgnoredUser.findOneAndDelete({ name: name.toLowerCase() }).exec()
    }

    isUserIgnored(user: string): Promise<boolean> {
        return IgnoredUser.exists({ name: user.toLowerCase() })
    }
}