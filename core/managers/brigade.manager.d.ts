import mongoose from '../providers/database.provider';
export declare const BrigadeEntry: mongoose.Model<any, {}, {}, {}>;
export default class brigadeManager {
    private static _instance?;
    static get Instance(): brigadeManager;
    private constructor();
    addBrigadeEntry(origin: string, originator: string, target: string): Promise<any>;
    isTargetOnBrigadeList(target: string): Promise<boolean>;
    getBrigadeEntryInfo(target: string): Promise<any>;
    static stringContainsBrigadeLink(text: string): IStringContainsBrigadeLinkResults[];
}
export interface IStringContainsBrigadeLinkResults {
    bContainsLink: boolean;
    sInput: string;
    sTargetID: string;
    match?: string;
}
