import mongoose from '../providers/database.provider';
export declare const IgnoredUser: mongoose.Model<any, {}, {}, {}>;
export default class ignoredManager {
    private static _instance?;
    static get Instance(): ignoredManager;
    private constructor();
    addIgnoredUser(name: string, actioner: string): Promise<any>;
    removeIgnoredUser(name: string): Promise<void>;
    isUserIgnored(user: string): Promise<boolean>;
    getIgnoredUserInfo(name: string): Promise<any>;
}
