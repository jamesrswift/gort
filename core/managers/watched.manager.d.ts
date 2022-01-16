import mongoose from '../providers/database.provider';
export declare const WatchedUser: mongoose.Model<any, {}, {}, {}>;
export default class watchedManager {
    private static _instance?;
    static get Instance(): watchedManager;
    private constructor();
    addWatchedUser(name: string, actioner: string, message: string): Promise<any>;
    removeWatchedUser(name: string): Promise<void>;
    isUserWatched(user: string): Promise<boolean>;
    getWatchedUserInfo(name: string): Promise<any>;
}
