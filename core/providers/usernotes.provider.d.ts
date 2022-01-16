import * as toolbox from 'toolbox-api';
import Snoowrap from 'snoowrap';
export default class UsernotesProvider {
    private static _instance?;
    static get Instance(): UsernotesProvider;
    private constructor();
    getUsernotesPage(): Promise<Snoowrap.WikiPage>;
    addUsernote(user: Snoowrap.RedditUser, note: string): void;
    addUsernoteByName(user: string, note: string): void;
    getUsernotesByName(user: string): Promise<toolbox.PrettyUsernote[]>;
}
